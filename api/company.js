module.exports = app => {
  //Definição de variáveis globais em app
  table_companies = 'tb_companies'

  //Definição das funções desta rota
  const create = async (req, res) => {
    try {

      //CAPTURE A PK DO REQUESTER
      const pk_requester = app.api.authHelper.get_pk_user(req)

      //DADOS COMPLETOS?
      if (req.body.cnpj !== '' && req.body.nme_company !== '') {

        //É ADMINISTRADOR?
        if (await app.api.authHelper.is_user('admin', req)) {
          //PREPARA OS DADOS, 
          company_data = {
            cnpj: req.body.cnpj,
            nme_company: req.body.nme_company,
            fk_users_company: pk_requester,
            is_active: true,
          }

          // CADASTRA
          await app.api.dbHelper.insert(table_companies, company_data)

          // AVISA QUE A REQUISIÇÃO FOI ATENDIA
          res.status(200).send('Empresa inserida com sucesso!')

        } else {
          // Não é administrador, negue a requisição
          res.status(400).send('Apenas administradores podem realizar esta ação.')
        }

      } else {
        // ALGUM DADO OBRIGATÓRIO NÃO FOI PREENCHIDO. NEGUE A REQUISIÇÃO
        res.status(250).send('Algum dado obrigatório não foi preenchido.')
      }
    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\ncompany.js - create\n\n', err)
      res.status(400).json(err)
    }
  }

  const read = async (req, res) => {
    try {
      //Confere se é um admin que quer conferir a empresa
      if (await app.api.authHelper.is_user('admin', req)) {

        //É, então monta a query do select
        const kwargs = {
          table: table_companies,
          where: { cnpj: req.body.cnpj },
          mode: 'first'
        }
        const company = await app.api.dbHelper.select(kwargs)
        res.status(200).json(company)
      } else {
        res.status(400).send('Necessário acesso de administrador.')
      }

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\ncompany.js - read\n\n', err)
      res.status(400).json(err)

    }
  }

  const update = async (req, res) => {
    try {
      if (req.body.cnpj === '' || req.body.nme_company === ''){
        return res.status(250).send('Alteração não realizada! Cnpj ou nome da empresa não preenchidos.')
      }

      //PK DO REQUERENTE?
      const pk_requester = app.api.authHelper.get_pk_user(req)

      //É ADMINISTRADOR?
      if (await app.api.authHelper.is_user('admin', req)) {

        //INICIO CONSTRUÇÃO update_data - Este objeto indica o que será alterado
        let update_data = {}
        update_data.cnpj = req.body.cnpj

        update_data.nme_company = req.body.nme_company

        update_data.fk_users_company = pk_requester
        // FIM DA CONSTRUÇÃO update_data

        //Prepara objeto que representa a cláusula where
        let where = {}
        if (req.body.target_pk_company !== undefined) {
          where = { 'pk_company': req.body.target_pk_company }
        } else if (req.body.target_cnpj) {
          where = { 'cnpj': req.body.target_cnpj }
        }

        //ATENDE A REQUISIÇÃO
        app.api.dbHelper.update(table_companies, update_data, where)
        res.status(200).send('Empresa alterada com sucesso!')

      } else {
        // NÃO É ADMINISTRADOR NEGUE A REQUISIÇÃO 
        res.status(400).send('Não foi possível realizar a sua solicitação.')
      }

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\ncompany.js - update\n\n', err)
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
          fk_users_company: pk_requester,
        }

        //Prepara objeto que representa a cláusula where
        let where = {}
        if (req.body.target_pk_company !== undefined) {
          where = { 'pk_company': req.body.target_pk_company }
        } else if (req.body.target_cnpj) {
          where = { 'cnpj': req.body.target_cnpj }
        }

        //Realize a deleção lógica. E confirme a requisição
        app.api.dbHelper.update(
          table_companies,
          what,
          where,
        )
        res.status(200).send('Empresa deletada com sucesso!')

      } else { //Não é administrador, recuse a requisição
        res.status(400).send('Apenas administradores podem realizar esta ação.')
      }

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\ncompany.js - del\n\n', err)
      res.status(400).json(err)

    }
  }

  return { create, read, update, del }
}