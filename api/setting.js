//TODO: Codificar crud
module.exports = app => {
  //Definição de variáveis globais desta rota
  table_settings = 'tb_settings'

  //Definição das funções desta rota
  const create = async (req, res) => {
    try {

      //PK DO REQUESTER
      const pk_requester = app.api.authHelper.get_pk_user(req)

      //ADMINISTRADOR?
      if (await app.api.authHelper.is_user('admin', req)) {

        //MIN_COST PREENCHIDO?
        if (req.body.min_cost !== undefined) {

          //INATIVE TODAS AS OUTRAS CONFIGURAÇÕES
          await app.api.dbHelper.update(table_settings, { is_active: false })

          //PREPARA A INFORMAÇÃO DE INSERÇÃO
          let setting_create = {
            fk_users_settings: pk_requester,
            update_at: app.api.dbHelper.to_timestamp(Date.now()),
            min_cost: req.body.min_cost,
            is_active: true,
          }

          //ATENDA A REQUISIÇÃO
          await app.api.dbHelper.insert(table_settings, setting_create)
          res.status(200).send()

        } else {
          //MIN_COST NÃO PREENCHIDO, NEGUE A REQUISIÇÃO
          res.status(400).send('Custo por minuto não preenchido.')
        }
      } else {
        //NÃO É ADMINISTRADOR, NEGUE A REQUISIÇÃO
        res.status(400).send('Apenas administradores podem realizar esta ação.')

      }

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nsetting.js - create\n\n', err)
      res.status(400).json(err)
    }
  }

  const read = async (req, res) => {
    try {

      //ADMINISTRADOR?
      if (await app.api.authHelper.is_user('admin', req)) {

        //Pesquisa especifica ou global?
        if (req.body.target_pk_setting === undefined) {

          //GLOBAL
          const result = await app.api.dbHelper.select({
            table: table_settings,
          })

          if (Object.keys(result).length > 0) {
            res.status(200).json(result)
            return result
          } else {
            res.status(200).send('Ainda não existem configurações no banco de dados.')
          }

        } else {
          //ESPECÍFICA
          const result = await app.api.dbHelper.select({
            table: table_settings,
            where: {pk_setting: req.body.target_pk_setting}
          })

          if (Object.keys(result).length > 0) {
            res.status(200).json(result)
            return result
          } else {
            res.status(400).send('Configuração não encontrada na base de dados')
          }
        }

      } else {
        //NÃO É ADMINISTRADOR
        res.status(400).send('Apenas administradores podem executar esta ação')
      }

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nsetting.js - read\n\n', err)
      res.status(400).json(err)
    }
  }

  const getCost = async (req, res) => {
    try {
      const result = await app.api.dbHelper.select({
        table: table_settings,
        where: {is_active: true},
        what:['min_cost']
      })
      res.status(200).json(result)

    }catch (err){
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nsetting.js - getCost\n\n', err)
      res.status(400).json(err)
    }
  }
  //A FUNÇÃO, ABAIXO, NÃO EXISTIRÁ NO SISTEMA, uma vez que o create garante
  // que apenas a ultima configuração estará ativa.
  // const update = async (req, res) => {  
  //   try {

  //   } catch (err) {
  //     console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nsetting.js - update\n\n', err)
  //     res.status(400).json(err)
  //   }
  // }

  const del = async (req, res) => {
    try {

      let kwargs = {
        table: table_settings,
        where: {pk_setting: req.body.target_pk_setting},
        what: ['update_at'],
        mode: 'first'
      }

      const setting_date = await app.api.dbHelper.select(kwargs)
      
      if (app.api.dbHelper.time_limit(setting_date.update_at)) {
        app.api.dbHelper.del(table_settings, { pk_setting: req.body.target_pk_setting })
        res.status(200).send()

      } else {
        res.status(400).send('A deleção só é permitida após 5 anos.')
      }

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nsetting.js - del\n\n', err)
      res.status(400).json(err)

    }
  }

  return { create, read, /*update,*/ del, getCost }
}