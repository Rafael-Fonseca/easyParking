//TODO: Codificar crud
module.exports = app => {
  //Definição de variáveis globais em app
  table_offers = 'tb_offers'

  //Definição das funções desta rota
  const to_timestamp = function (miliseconds) {
    //TODO: Está considerando outro timezone, arrumar para TZ BR
    return new Date(miliseconds).toISOString()
  }

  const create = async (req, res, next) => {

    try {
      //CAPTURE A PK DO REQUESTER
      const pk_requester = app.api.authHelper.get_pk_user(req)

      //DADOS COMPLETOS?
      if (
        req.body.fk_companies_offers !== undefined &&
        req.body.tme_begin !== undefined &&
        // req.body.imb !== undefined &&        
        req.body.tme_end !== undefined) {

        //É ADMINISTRADOR?
        if (await app.api.authHelper.is_user('admin', req, res, next)) {

          //PREPARA OS DADOS, 
          offer_data = {
            fk_companies_offers: req.body.fk_companies_offers,
            fk_users_offers: pk_requester,
            tme_begin: to_timestamp(req.body.tme_begin),
            tme_end: to_timestamp(req.body.tme_end),
            //img: req.body.img
            is_active: true,
          }

          // CADASTRA
          await app.api.dbHelper.insert(table_offers, offer_data)

          // AVISA QUE A REQUISIÇÃO FOI ATENDIA
          res.status(200).send()

        } else {
          // Não é administrador, negue a requisição
          res.status(400).send('Apenas administradores podem realizar esta ação.')
        }

      } else {
        // ALGUM DADO OBRIGATÓRIO NÃO FOI PREENCHIDO. NEGUE A REQUISIÇÃO
        res.status(400).send('Algum dado obrigatório não foi preenchido.')
      }

    } catch (e) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\noffer.js - create\n\n', e)

    }
  }

  const read = async (req, res, next) => {
    try {
      await app.api.dbHelper.select({ table: table_offers })
      res.status(200).send()

    } catch (e) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\noffer.js - read\n\n', e)
      res.status(400).send()

    }
  }

  const update = async (req, res, next) => {

    try {
      //PK DO REQUERENTE?
      const pk_requester = app.api.authHelper.get_pk_user(req)

      //É ADMINISTRADOR?
      if (await app.api.authHelper.is_user('admin', req, res, next)) {

        //INICIO CONSTRUÇÃO update_data - Este objeto indica o que será alterado
        let update_data = {}
        if (req.body.fk_companies_offers !== undefined)
          update_data.fk_companies_offers = req.body.fk_companies_offers

        if (req.body.tme_begin !== undefined)
          update_data.tme_begin = to_timestamp(req.body.tme_begin)

        update_data.fk_users_offers = pk_requester

        if (req.body.tme_end !== undefined)
          update_data.tme_end = to_timestamp(req.body.tme_end)

        if (req.body.img !== undefined)
          update_data.img = req.body.img
        // FIM DA CONSTRUÇÃO update_data

        //Prepara objeto que representa a cláusula where
        const where = { pk_offer: req.body.target_pk_offer }

        //ATENDE A REQUISIÇÃO
        app.api.dbHelper.update(table_offers, update_data, where)
        res.status(200).send()

      } else {
        // NÃO É ADMINISTRADOR NEGUE A REQUISIÇÃO 
        res.status(400).send()
      }

    } catch (e) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\noffer.js - update\n\n', e)

    }
  }


  const del = async (req, res, next) => {

    try {

      //PK REQUERENTE
      pk_requester = app.api.authHelper.get_pk_user(req)

      //É ADMINISTRADOR?
      if (await app.api.authHelper.is_user('admin', req, res, next)) {

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
        res.status(200).send()

      } else { //Não é administrador, recuse a requisição
        res.status(400).send('Apenas administradores podem realizar esta ação.')
      }

    } catch (e) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\noffer.js - del\n\n', e)

    }
  }

  return { create, read, update, del }
}