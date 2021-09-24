const bcrypt = require('bcryptjs')

module.exports = app => {
  table = 'tb_users'
  const obterHash = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => callback(hash))
    })
  }

  // obterHash recebe os parametros (senha digitada pelo usuario , Callback Function)
  //      genSalt(10 saltos, arrow function que em caso de erro é realizada)
  // dentro da arrow function tem um .hash (dado a ser encriptado, saltos, progresso, erro(passou callback))

  const save = (req, res) => {
    obterHash(req.body.password, hash => {
      const password = hash
      app.api.dbHelper.insert(table, {
        name: `${req.body.name}`,
        cpf: `${req.body.cpf}`,
        mail: `${req.body.mail}`,
        password: `${password}`,
        fk_roles_user: req.body.fk_roles_user || 1,
        is_active: req.body.is_active || true,
      })
        .then(_ => res.status(204).send())
        .catch(err => res.status(400).json(err))
    })
  }


  const update = (req, res, next) => {
    try {
      if (req === undefined)
        return res.status(404).send()
      else
        return res.status(204).send()
    } catch (e) {
      next(e)
    }

  }


  // const update = (req, res) => {
  //   if(typeof req.body.mail === 'undefined')
  //   if(typeof req.body.password === 'undefined')
  //   if(typeof req.body.fk_roles_user === 'undefined')
  // }
  return { save, update }
}





//TODO: Codificar crud
// save = () => {
//     return {'sucesso': true}
// }


//TODO: Validar dados enviados
// validateData = props => {
//     // chama validaAtributo dos atributos necessários

// }

//Enviar requisição