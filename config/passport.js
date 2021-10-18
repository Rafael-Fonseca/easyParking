//Define estrategia de autenticação
const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
  const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  }

  const strategy = new Strategy(params, (payload, done) => {
    app.db('tb_users')
      .where({ pk_user: payload.pk_user })
      .first()
      .then(user => {
        if (user) {
          done(null, {
            pk_user: user.pk_user,
            mail: user.mail,
            fk_roles_user: user.fk_roles_user
          })
        } else {
          done(null, false)
        }
      })
      .catch(err => done(err, false))
  })

  passport.use(strategy)

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', { session: false }),
  }
}
