//Configura rotas
module.exports = app => {
  /*TODO: Criar as funções para as rotas, enquanto elas não existem
          elas crasham o código, por isso estão comentadas*/

  // app.get('/', app.api.general.ok)
  app.post('/signup', app.api.user.save)
  app.post('/signin', app.api.auth.signin)

  app.route('/update_user')
    .all(app.config.passport.authenticate())
    .put(app.api.user.update)
  //     .post(app.api.task.save)

  // app.route('/roles_create')
  //   .all(app.config.passport.authenticate())
  //   .post(app.api.role.save)

  // ------------- EXEMPLO!!!!!!!!!!!
  // app.route('/tasks/:id/toggle')
  //     .all(app.config.passport.authenticate())
  //     .put(app.api.task.toggleTask)
  //     .delete(app.api.task.remove)
}