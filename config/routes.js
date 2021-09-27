//Configura rotas
module.exports = app => {
  /*TODO: Criar as funções para as rotas, enquanto elas não existem
          elas crasham o código, por isso estão comentadas*/

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
    .put(app.api.user.update)

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


  // ------------- EXEMPLO!!!!!!!!!!!
  // app.route('/tasks/:id/toggle')
  //     .all(app.config.passport.authenticate())
  //     .put(app.api.task.toggleTask)
  //     .delete(app.api.task.remove)
}