//Configura rotas
module.exports = app => {
  /*TODO: Criar as funções para as rotas, enquanto elas não existem
          elas crasham o código, por isso estão comentadas*/

  // app.get('/', app.api.general.ok)
  app.post('/signup', app.api.user.create)
  app.post('/signin', app.api.auth.signin)

  app.route('/user_update')
    .all(app.config.passport.authenticate())
    .put(app.api.user.update)


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