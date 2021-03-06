const bcrypt = require('bcryptjs')

module.exports = app => {
  //Definição de variáveis globais
  table_users = 'tb_users'

  //Definição de funções
  const obterHash = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => callback(hash))
    })
  }

  // obterHash recebe os parametros (senha digitada pelo usuario , Callback Function)
  //      genSalt(10 saltos, arrow function que em caso de erro é realizada)
  // dentro da arrow function tem um .hash (dado a ser encriptado, saltos, progresso, erro(passou callback))


  const create = (req, res) => {
    //TODO: Refatorar quando confirm_password entrar na jogada
    //TODO: Alterar o hard coded para buscar no banco o equivalente a fk do user padrão
    if (req.body.name !== undefined &&
      req.body.cpf !== undefined &&
      req.body.mail !== undefined &&
      req.body.password !== undefined) {

      obterHash(req.body.password, hash => {
        const password = hash
        app.api.dbHelper.insert(table_users, {
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
    }else{
      res.status(400).send('Existem campos obrigatórios não preenchidos.')
    }

  }
  /************************************************************
   * 
   * Comentário inserido em teste de fluxo de desenvolvimento pelo github
   * 
   ************************************************************/

  const read = async (req, res) => {

    try {
      const pk_requester = app.api.authHelper.get_pk_user(req)

      if (req.body.target_pk_user === undefined ||
        req.body.target_pk_user === pk_requester) {//User quer saber seus dados

        await app.api.dbHelper.select({
          table: table_users,
          where: { pk_user: pk_requester },
          mode: 'first',
        })

        res.status(200).send()

      } else {
        //Usuário quer saber de outro usuário
        if (await app.api.authHelper.is_user('admin', req)) {
          //É admin, pode mostrar
          await app.api.dbHelper.select({ table: table_users })
          res.status(200).send()

        } else {
          //Não é admin e quer saber de outro usuário, recuse
          res.status(400).send('Apenas administradores podem realizar esta consulta')

        }
      }
    } catch (err) {
      console.log('\n\nOLHAAA O EEEEEERRRRROOOO!!!!\n\nuser.js read\n\n', err)
      res.status(400).json(err)
    }


  }


  const update = async (req, res) => {
    //TODO: Refatorar, dividindo em outras funções.

    try {
      // PEGAR PK DO REQUISITANTE
      const pk_requester = app.api.authHelper.get_pk_user(req)

      //INICIO CONSTRUÇÃO update_data - Este objeto indica o que será alterado
      let update_data = {}
      if (req.body.name !== undefined)
        update_data.name = req.body.name

      if (req.body.password !== undefined)
        update_data.password = req.body.password

      if (req.body.mail !== undefined)
        update_data.mail = req.body.mail

      if (req.body.fk_roles_user !== undefined)
        update_data.fk_roles_user = req.body.fk_roles_user

      if (req.body.cpf !== undefined)
        update_data.cpf = req.body.cpf

      if (req.body.is_active !== undefined)
        update_data.is_active = req.body.is_active
      // FIM DA CONSTRUÇÃO update_data

      //Prepara objeto que representa a cláusula where
      let where = {}
      if(req.body.target_pk_user !== undefined){
        where = {pk_user: req.body.target_pk_user}
      }else if(req.body.target_cpf !== undefined){
        where = {cpf: req.body.target_cpf}
      }

      // REQUISITANTE QUER ALTERAR O PRÓPRIO CADASTRO OU O DE OUTRO?
      if (pk_requester === req.body.target_pk_user) {
        // PRÓPRIO? E QUER ALTERAR SUA ROLE?
        if (update_data.fk_roles_user === undefined) {
          // NÃO QUER ALTERAR A ROLE, ENTÃO TUDO BEM, PODE ALTERAR
          app.api.dbHelper.update(table_users, update_data, where)
          res.status(200).send()
        } else {
          // ESTÁ QUERENDO ALTERAR A ROLE! NÃO DEIXA, SÓ ADMIN PODE ALTERAR ROLE
          res.status(400).send('Apenas administradores podem realizar esta alteração.')
        }

      } else {
        // DE OUTRO USUÁRIO? ENTÃO CONFERE A ROLE DO REQUISITANTE
        if (await app.api.authHelper.is_user('admin', req)) {
          // SE ADMIN, CONFERE O QUE O ADMIN QUER ALTERAR
          if (
            update_data.name !== undefined ||
            update_data.password !== undefined ||
            update_data.mail !== undefined ||
            update_data.cpf !== undefined ||
            update_data.is_active !== undefined
          ) {
            //NEGUE A REQ, ESTES CAMPOS DEVEM SER ALTERADOS PELO DONO DO PERFIL
            res.status(400).send('Administradores só podem alterar a função de outros usuários.')
          } else {
            //ADMIN TENTANDO ALTERAR A FUNÇÃO DE OUTRO USUÁRIO, ACEITE A REQUISIÇÃO
            changed = await app.api.dbHelper.update(table_users, update_data, where)
            if (changed === 0){
              res.status(200).send('Usuário não encontrado na base de dados!')
            }else{
              res.status(200).send('Usuário alterado com sucesso!')
            }
          }

        } else {
          // SE != DE ADMIN, RECUSA A REQUISIÇÃO
          res.status(400).send('Apenas administradores podem realizar esta alteração.')
        }

      }
    } catch (err) {
      console.log('\n\nOLHAAA O EEEEEERROOOO!!!!\n\nuser.js - update\n\n', err)
      res.status(400).json(err)
    }

  }


  const del = async (req, res) => {
    try {
      //Descobre quem é o requerente
      pk_requester = app.api.authHelper.get_pk_user(req)

      //Se ele estiver tentando deletar o seu cadastro
      if (req.body.target_pk_user === undefined ||
        req.body.target_pk_user === pk_requester) {

        //Realize a deleção lógica. E confirme a requisição
        app.api.dbHelper.update(
          table_users,
          { is_active: false },
          { pk_user: pk_requester }
        )
        res.status(200).send()

      } else { //Esta tentando deletar o cadastro de outro usuário
        if (await app.api.authHelper.is_user('admin', req)) {
          //Já que é administrador, realize a deleção lógica. E confirme a requisição
          app.api.dbHelper.update(
            table_users,
            { is_active: false },
            { pk_user: req.body.target_pk_user }
          )
          res.status(200).send()

        } else { //Não é administrador, recuse a requisição
          res.status(400).send('Apenas administradores podem realizar esta ação.')
        }

      }

    } catch (err) {
      console.log('\n\nOLHAAA O EEEEEERROOOO!!!!\n\nuser js - del\n\n', err)
      res.status(400).json(err)
    }
  }

  return { create, read, update, del }
}
