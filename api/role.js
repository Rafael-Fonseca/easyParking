module.exports = app => {
  //Definição de variáveis globais desta rota
  table_roles = 'td_roles'


  //Definição das funções desta rota
  const create = async (req, res, next) => {
    try {

      if (await app.api.authHelper.is_user('admin', req, res, next)) {
        app.api.dbHelper.insert(table_roles, {
          role: req.body.role,
          discount: req.body.discount,
          is_active: true
        })
        res.status(201).send()

      } else {
        res.status(400).send('Necessário acesso de administrador.')
      }
    } catch (e) {
      next(e)
    }
  }


  const read = async (req, res, next) => {
    try{
      if (await app.api.authHelper.is_user('admin', req, res, next)) {
        await app.api.dbHelper.select(req.body)
        res.status(200).send()
      } else {
        res.status(400).send('Necessário acesso de administrador.')
      }

    }catch(e){
      console.log('\n\nOLHAAA O EEEEEERROOOO!!!!\n\n role.js read', e)
      next(e)
    }
  }


  const update = async (req, res, next) => {
    //Prepara objeto que indica o que será alterado
    try {
      let update_data_roles = {}
      if (req.body.role !== undefined)
        update_data_roles.role = req.body.role
      if (req.body.discount !== undefined)
        update_data_roles.discount = req.body.discount
      if (req.body.is_active !== undefined)
        update_data_roles.is_active = req.body.is_active
      
      //Prepara objeto que representa a cláusula where
      const where = {pk_role: req.body.pk_role}

      // Se o usuário for admin, altera, do contrário, nega a requisição.
      if (await app.api.authHelper.is_user('admin', req, res, next)) {
        app.api.dbHelper.update('td_roles', update_data_roles, where)
        res.status(200).send()
      } else {
        res.status(400).send('Necessário acesso de administrador.')
      }
    } catch (e) {
      next(e)
    }
  }


  const del = async (req, res, next) => {
    try {

      let delete_data_roles = {is_active: false}
      const where = {pk_role: req.body.pk_role}

      if (await app.api.authHelper.is_user('admin', req, res, next)) {
        app.api.dbHelper.update('td_roles', delete_data_roles, where)
        res.status(200).send()
      } else {
        res.status(400).send('Necessário acesso de administrador.')
      }
    } catch (e) {
      next(e)
    }
  }


  return { create, read, update, del }
}