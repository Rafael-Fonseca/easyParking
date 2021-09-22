const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcryptjs')

module.exports = app => {
  const signin = async (req, res) => {
    if (!req.body.mail || !req.body.password) {
      return res.status(400).send('Dados incompletos')
    }

    const user = await app.db('tb_users')
      .where({ mail: req.body.mail })
      .first()

    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(401).send()
        }
        
        const payload = { pk_user: user.pk_user }
        res.json({
          name: user.name,
          mail: user.mail,
          token: jwt.encode(payload, authSecret)
        })
      })
    } else {
      res.status(400).send('E-mail ou senha incorreto.')
    }
  }
  return { signin }
}