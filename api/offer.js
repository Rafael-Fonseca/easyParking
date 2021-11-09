module.exports = app => {

  //Definição de variáveis globais em app
  table_offers = 'tb_offers'

  //Definição das funções desta rota
  const create = async (req, res) => {

    try {
      //CAPTURE A PK DO REQUESTER
      const pk_requester = app.api.authHelper.get_pk_user(req)

      //CAPTURAR A PK DA EMPRESA
      const kwargs = {
        table: 'tb_companies',
        where: { cnpj: req.body.cnpj },
        what: ['pk_company'],
        mode: 'first'
      }

      const company = await app.api.dbHelper.select(kwargs)
      if (company === undefined) {
        return res.status(250).send('Não foi possível localizar o cnpj informado.')
      }

      //DADOS COMPLETOS?
      if (
        req.body.tme_begin !== undefined &&
        req.body.tme_end !== undefined &&
        req.body.img !== undefined) {

        //É ADMINISTRADOR?
        if (await app.api.authHelper.is_user('admin', req)) {

          //PREPARA OS DADOS, 
          offer_data = {
            fk_companies_offers: company.pk_company,
            fk_users_offers: pk_requester,
            tme_begin: app.api.dbHelper.to_timestamp(req.body.tme_begin),
            tme_end: app.api.dbHelper.to_timestamp(req.body.tme_end),
            img: req.body.img,
            is_active: true,
          }

          // console.log('\nimg:\n', req.body.img)

          // CADASTRA
          await app.api.dbHelper.insert(table_offers, offer_data)

          // AVISA QUE A REQUISIÇÃO FOI ATENDIA
          return res.status(200).send('Oferta inserida com sucesso!')

        } else {
          // Não é administrador, negue a requisição
          return res.status(400).send('Apenas administradores podem realizar esta ação.')
        }

      } else {
        // ALGUM DADO OBRIGATÓRIO NÃO FOI PREENCHIDO. NEGUE A REQUISIÇÃO
        return res.status(250).send('Algum dado obrigatório não foi preenchido.')
      }

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\noffer.js - create\n\n',)
      return res.status(400).json(err)
    }
  }

  const read = async (req, res) => {
    try {
      const offers = await app.api.dbHelper.select({ table: table_offers })
      // console.log('\n\nOFFER API!!! - READ\n\n', offers)

      try {
        for (var i = 0; i < offers.length; i++) {
          nme_company = await app.api.dbHelper.select({
            table: table_companies,
            what: ['nme_company', 'cnpj'],
            where: {pk_company: offers[i].fk_companies_offers}
          })
          offers[i].nme_company = nme_company[0].nme_company
          offers[i].cnpj = nme_company[0].cnpj

        }
      } catch (err) {
        console.log('\n\nEEEEEEERRRRROOOOO!!!\n\noffer.js - read\n\n', err)
        res.status(400).json(err)
      }

      // offers [{}, {}]
      res.status(200).json(offers)

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\noffer.js - read\n\n', err)
      res.status(400).json(err)

    }
  }

  const update = async (req, res) => {

    try {
      //PK DO REQUERENTE?
      const pk_requester = app.api.authHelper.get_pk_user(req)

      //É ADMINISTRADOR?
      console.log('aqui?')
      if (await app.api.authHelper.is_user('admin', req)) {

        //INICIO CONSTRUÇÃO update_data - Este objeto indica o que será alterado
        let update_data = {}
        if (req.body.fk_companies_offers !== undefined)
          update_data.fk_companies_offers = req.body.fk_companies_offers

        if (req.body.tme_begin !== undefined)
          update_data.tme_begin = app.api.dbHelper.to_timestamp(req.body.tme_begin)

        update_data.fk_users_offers = pk_requester

        if (req.body.tme_end !== undefined)
          update_data.tme_end = app.api.dbHelper.to_timestamp(req.body.tme_end)

        if (req.body.img !== undefined)
          update_data.img = req.body.img
        // FIM DA CONSTRUÇÃO update_data

        //Prepara objeto que representa a cláusula where
        const where = { pk_offer: req.body.target_pk_offer }

        //ATENDE A REQUISIÇÃO
        console.log('\n\nAntes de atender a requisição\n\nimg:\t', req.body.img)
        console.log('\npk_offer:\t', req.body.target_pk_offer)
        app.api.dbHelper.update(table_offers, update_data, where)
        res.status(200).send('Oferta alterada com sucesso!')

      } else {
        // NÃO É ADMINISTRADOR NEGUE A REQUISIÇÃO 
        res.status(400).send()
      }

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\noffer.js - update\n\n', err)
      res.status(400).json(err)
    }
  }


  const del = async (req, res) => {

    try {

      //PK REQUERENTE
      pk_requester = app.api.authHelper.get_pk_user(req)

      //É ADMINISTRADOR?
      if (await app.api.authHelper.is_user('admin', req)) {

        //Prepare os dados para deleção
        const what = {
          is_active: false,
          fk_users_offers: pk_requester,
        }

        const where = {
          pk_offer: req.body.target_pk_offer
        }

        //Realize a deleção lógica. E confirme a requisição
        app.api.dbHelper.update(
          table_offers,
          what,
          where,
        )
        res.status(200).send('Oferta deletada com sucesso!')

      } else { //Não é administrador, recuse a requisição
        res.status(400).send('Apenas administradores podem realizar esta ação.')
      }

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\noffer.js - del\n\n', err)
      res.status(400).json(err)
    }
  }

  return { create, read, update, del }
}