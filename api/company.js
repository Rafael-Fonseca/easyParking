//TODO: Codificar crud
module.exports = app => {
  //Definição de variáveis globais em app
  table_companies = 'tb_companies'

  //Definição das funções desta rota
  const create = async (req, res, next) => {
    try {

      //CAPTURE A PK DO REQUESTER
      const pk_requester = app.api.authHelper.get_pk_user(req)

      //DADOS COMPLETOS?
      if (req.body.cnpj !== undefined && req.body.nme_company !== undefined) {

        //É ADMINISTRADOR?
        if (await app.api.authHelper.is_user('admin', req, res, next)) {
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
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\ncompany.js - create\n\n', e)
      next(e)
    }
  }

  const read = async (req, res, next) => {
    try {
      if (await app.api.authHelper.is_user('admin', req, res, next)) {
        await app.api.dbHelper.select(req.body)
        res.status(200).send()
      } else {
        res.status(400).send('Necessário acesso de administrador.')
      }

    } catch (e) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\ncompany.js - read\n\n', e)

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
        if (req.body.cnpj !== undefined)
          update_data.cnpj = req.body.cnpj

        if (req.body.nme_company !== undefined)
          update_data.nme_company = req.body.nme_company

        update_data.fk_users_company = pk_requester

        if (req.body.is_active !== undefined)
          update_data.is_active = req.body.is_active
        // FIM DA CONSTRUÇÃO update_data

        //Prepara objeto que representa a cláusula where
        const where = { pk_company: req.body.target_pk_company }

        //ATENDE A REQUISIÇÃO
        app.api.dbHelper.update(table_companies, update_data, where)
        res.status(200).send()

      } else {
        // NÃO É ADMINISTRADOR NEGUE A REQUISIÇÃO 
        res.status(400).send()
      }

    } catch (e) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\ncompany.js - update\n\n', e)

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
          fk_users_company: pk_requester,
        }

        const where = {
          pk_company: req.body.target_pk_company
        }

        //Realize a deleção lógica. E confirme a requisição
        app.api.dbHelper.update(
          table_companies,
          what,
          where,
        )
        res.status(200).send()

      } else { //Não é administrador, recuse a requisição
        res.status(400).send('Apenas administradores podem realizar esta ação.')
      }

    } catch (e) {
    console.log('\n\nEEEEEEERRRRROOOOO!!!\n\ncompany.js - del\n\n', e)
  }
}

return { create, read, update, del }
}