//Configura rotas
module.exports = app => {

  // INICIO ROTAS HOME - SIGN UP - SIGN IN
  // app.get('/', app.api.general.ok)
  app.post('/signup', app.api.user.create) //SINÔNIMO '/user_create'
  app.post('/signin', app.api.auth.signin)


  // INICIO ROTAS --- USER
  app.route('/user_read')
    .all(app.config.passport.authenticate())
    .post(app.api.user.read)

  app.route('/user_update')
    .all(app.config.passport.authenticate())
    .post(app.api.user.update)

  app.route('/user_delete')
    .all(app.config.passport.authenticate())
    .post(app.api.user.del)


  // INICIO ROTAS --- ROLES
  app.route('/roles_create')
    .all(app.config.passport.authenticate())
    .post(app.api.role.create)

  app.route('/roles_read')
    .all(app.config.passport.authenticate())
    .post(app.api.role.read)

  app.route('/roles_update')
    .all(app.config.passport.authenticate())
    .put(app.api.role.update)

  app.route('/roles_delete')
    .all(app.config.passport.authenticate())
    .delete(app.api.role.del)


  // INICIO ROTAS --- CARDS
  app.route('/cards_create')
    .all(app.config.passport.authenticate())
    .post(app.api.card.create)

  app.route('/cards_read')
    .all(app.config.passport.authenticate())
    .post(app.api.card.read)

  app.route('/cards_update')
    .all(app.config.passport.authenticate())
    .post(app.api.card.update)

  app.route('/cards_delete')
    .all(app.config.passport.authenticate())
    .post(app.api.card.del)


  // INICIO ROTAS --- COMPANY
  app.route('/company_create')
    .all(app.config.passport.authenticate())
    .post(app.api.company.create)

  app.route('/company_read')
    .all(app.config.passport.authenticate())
    .post(app.api.company.read)

  app.route('/company_update')
    .all(app.config.passport.authenticate())
    .post(app.api.company.update)

  app.route('/company_delete')
    .all(app.config.passport.authenticate())
    .post(app.api.company.del)


  // INICIO ROTAS --- OFFER
  app.route('/offer_create')
    .all(app.config.passport.authenticate())
    .post(app.api.offer.create)

  app.route('/offer_read')
    .get(app.api.offer.read)

  app.route('/offer_update')
    .all(app.config.passport.authenticate())
    .put(app.api.offer.update)

  app.route('/offer_delete')
    .all(app.config.passport.authenticate())
    .post(app.api.offer.del)


  // INICIO ROTAS --- TICKET
  app.route('/ticket_create')
    .get(app.api.ticket.create)

  app.route('/ticket_read')
    .post(app.api.ticket.read)

  app.route('/ticket_update')
    .post(app.api.ticket.update)

  app.route('/ticket_delete')
    .post(app.api.ticket.del)


  // INICIO ROTAS --- SETTING
  app.route('/setting_create')
    .all(app.config.passport.authenticate())
    .post(app.api.setting.create)

  app.route('/setting_read')
    .all(app.config.passport.authenticate())
    .post(app.api.setting.read)

  app.route('/get_cost')
    .get(app.api.setting.getCost)

  app.route('/setting_update')
    .all(app.config.passport.authenticate())
    .post(app.api.setting.create) //Perceba que chama create propositalmente


  app.route('/setting_delete')
    .post(app.api.setting.del)

}