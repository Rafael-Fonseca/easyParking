const { authSecret } = require('../.env')
var jwt = require('jwt-simple')

//TODO: Codificar crud
module.exports = app => {
  default_table = 'td_roles'
  default_pk_role_admin = 3

  const save = async (req, res, next) => {
    try {

      var payload = await jwt.decode(req.get('Authorization').slice(7), authSecret)
      result = await app.api.dbHelper.select({
        table: 'tb_users',
        what: ['fk_roles_user'],
        where: { pk_user: payload.pk_user },
        mode: 'first'
      })
      if (result.fk_roles_user === default_pk_role_admin) {
        //TODO: Paramos aqui o código está entrando até aqui.
        console.log('role:', result.fk_roles_user)
        res.status(202).send()
      } else {
        console.log('role\n:', result)
        res.status(203).send()
      }

    } catch (e) {
      // next(e)
      // console.log('\n\ntoken:!!!!!!!!!!!!!!!\n\n', req_pk_user)
      res.status(400).send()
    }
  }


  return { save }
}