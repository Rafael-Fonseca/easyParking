const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcryptjs')

module.exports = app => {
  const signin = async (req, res) => {
    try {

      if (!req.body.mail || !req.body.password) {
        return res.status(400).send('Dados incompletos')
      }

      const user = await app.api.dbHelper
        .select({ table: 'tb_users', where: { mail: req.body.mail }, mode: 'first' })

      if (user === undefined) {
        return res.status(400).send('E-mail ou senha incorreto.')
      }

      const user_role = await app.api.dbHelper.select({
        table: 'td_roles',
        what: ['role'],
        where: { pk_role: user.fk_roles_user },
        mode: 'first'
      })


      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(401).send('E-mail ou senha incorreto.')
        }

        const payload = { pk_user: user.pk_user }
        res.json({
          name: user.name,
          mail: user.mail,
          role: user_role.role,
          token: jwt.encode(payload, authSecret)
        })
      })
    }
    catch (err) {
      throw err
    }
  }
  return { signin }
}