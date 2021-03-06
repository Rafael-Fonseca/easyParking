const { authSecret } = require('../.env')
var jwt = require('jwt-simple')

module.exports = app => {

  function get_pk_user(req) {
    var payload = jwt.decode(req.get('Authorization').slice(7), authSecret)
    // console.log('\n\n\n\nSO FAR SO GOOD\n\n\n\n', payload.pk_user)
    return payload.pk_user
  }

  const is_user = async (role, req) => {
    try {

      const result = await app.api.dbHelper.select({
        table: 'tb_users',
        what: ['fk_roles_user'],
        where: { pk_user: get_pk_user(req) },
        mode: 'first'
      })

      const user_role = await app.api.dbHelper.select({
        table: 'td_roles',
        what: ['role'],
        where: { pk_role: result.fk_roles_user },
        mode: 'first'
      })

      if (user_role.role === role) {
        return true
      } else {
        return false
      }
    } catch (err) {
      throw err
    }
  }


  return { get_pk_user, is_user }
}