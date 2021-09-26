// console.log('\n\nRETORNOU!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\nStatus Code:\t', resp.statusCode, '\n\nBODY:\t\t', resp.body)
import app from "../index"
import supertest from "supertest"
let request = supertest(app)

//Vamos utilizar o timestamp para assegurar que os valores adicionados
//ao banco de dados sejam únicos, evitando erros por chaves repetidas

pass_time = () => {
}

create_user_data = () => {
  // TODO: Este teste deve ser alterado a cada implementação de validação 
  // no user.js
  const now = Date.now().toString()
  let cpf = now.toString().slice(0, 11)
  let name = cpf
  let mail = cpf + '@provedor.com'
  let password = cpf.slice(0, 6)
  let confirmPassword = cpf.slice(0, 6)

  user_data = {
    name,
    cpf,
    mail,
    password,
    confirmPassword,
    fk_roles_user: 1,
    isActive: true,
  }
  return user_data
}

credentials_admin = {
  mail: 'Raf',
  password: '123'
}

credentials_user = {
  mail: 'user@mail',
  password: '123'
}

login = async function (user) {
  return request.post("/signin").send(user)
}

//TODO: Teste role.js
describe("Test role.js", () => {

  test("Deve retornar statusCode 201 se conseguir persistir uma nova 'role' no BD", () => {
    const data_role = { role: 'admin_test', discount: 1 }
    return login(credentials_admin).then(resp => {
      request.post('/roles_create')
        .set('Authorization', 'Bearer ' + resp.body.token)
        .send(data_role).then(res =>
          expect(res.statusCode).toEqual(201))
    })
  })

  test("Deve retornar statusCode 200 se conseguir alterar uma 'role' existente no BD", () => {
    const update_data_role = {
      role: 'admin_test_update',
      discount: 1,
      is_active: true,
      pk_role: 4,
    }
    return login(credentials_admin).then(resp => {
      request.put('/roles_update')
        .set('Authorization', 'Bearer ' + resp.body.token)
        .send(update_data_role).then(res =>
          expect(res.statusCode).toEqual(200))
    })
  })

  test("Deve retornar statusCode 200 se conseguir recuperar uma 'role'existente no BD", () => {
    let read_data_roles = { table: 'td_roles', where: { role: 'admin' } }
    return login(credentials_admin).then(resp => {
      request.post('/roles_read')
        .set('Authorization', 'Bearer ' + resp.body.token)
        .send(read_data_roles).then(res => {
          expect(res.statusCode).toEqual(200)
        })
    })
  })

  test("Deve retornar statusCode 200 se conseguir remover uma 'role' no BD", () => {
    const delete_data_role = {
      pk_role: 4,
    }
    return login(credentials_admin).then(resp => {
      request.delete('/roles_delete')
        .set('Authorization', 'Bearer ' + resp.body.token)
        .send(delete_data_role).then(res =>
          expect(res.statusCode).toEqual(200))
    })
  })

  test("Deve retornar statusCode 400 se NÃO conseguir persistir uma 'role' no BD", () => {
    const data_role = { role: 'user_test', discount: 0.75 }
    return login(credentials_user).then(resp => {
      request.post('/roles_create')
        .set('Authorization', 'Bearer ' + resp.body.token)
        .send(data_role).then(res =>
          expect(res.statusCode).toEqual(400))
    })

  })

  test("Deve retornar statusCode 400 se NÃO conseguir recuperar uma 'role' no BD", () => {
    let read_data_roles = { table: 'td_roles', where: { role: 'admin' } }
    return login(credentials_user).then(resp => {
      request.post('/roles_read')
        .set('Authorization', 'Bearer ' + resp.body.token)
        .send(read_data_roles).then(res => {
          expect(res.statusCode).toEqual(400)
        })
    })
  })

  test("Deve retornar statusCode 400 se NÃO conseguir alterar uma 'role' no BD", () => {
    const update_data_role = {
      role: 'user_test_update',
      discount: 1,
      is_active: true,
      pk_role: 4,
    }
    return login(credentials_user).then(resp => {
      request.put('/roles_update')
        .set('Authorization', 'Bearer ' + resp.body.token)
        .send(update_data_role).then(res =>
          expect(res.statusCode).toEqual(400))
    })
  })

})
// })


describe("Test auth.js", () => {

  test("Deve retornar statusCode 200 se receber credenciais que confiram com o BD", () => {
    let credentials = { mail: 'Raf', password: '123' }
    return login(credentials).then(res => {
      expect(res.statusCode).toEqual(200)
    })
  })

  test("Deve retornar statusCode 400 se apenas o campo mail for informado.", () => {
    let credentials = { mail: 'test@mail.com' }
    return login(credentials).then(res => {
      expect(res.statusCode).toEqual(400)
    })
  })

  test("Deve retornar statusCode 400 se apenas o campo password for informado.", () => {
    let credentials = { password: '123' }
    return login(credentials).then(res => {
      expect(res.statusCode).toEqual(400)
    })
  })

  test("Deve retornar statusCode 401 se o campo senha estiver incorreto.", () => {
    let credentials = { mail: 'Raf', password: '1234' }
    return login(credentials).then(res => {
      expect(res.statusCode).toEqual(401)
    })
  })

  test("Deve retornar statusCode 400 se o campo e-mail informado estiver errado.", () => {
    let credentials = { mail: 'Rafa', password: '123' }
    return login(credentials).then(res => {
      expect(res.statusCode).toEqual(400)
    })
  })

  test("Deve retornar statusCode 400 se os campos e-mail e senha informados estiverem errados.", () => {
    let credentials = { mail: 'Rafa', password: '1234' }
    return login(credentials).then(res => {
      expect(res.statusCode).toEqual(400)
    })
  })
})


describe("Test user.js", () => {

  test("Deve retornar statusCode 204 se conseguir persistir um novo user no BD", () => {
    setInterval(pass_time, 1000)
    data_post = create_user_data()
    return request.post('/signup').send(data_post)
      .then(res => expect(res.statusCode).toEqual(204))
  })

  test("Deve retornar statusCode 204 se conseguir persistir um novo empregado no BD", () => {
    setInterval(pass_time, 1000)
    data_post = create_user_data()
    data_post.fk_roles_user = 2
    return request.post('/signup').send(data_post)
      .then(res => expect(res.statusCode).toEqual(204))
  })


  test("Deve retornar statusCode 204 se conseguir persistir um novo admin no BD", () => {
    setInterval(pass_time, 1000)
    data_post = create_user_data()
    data_post.fk_roles_user = 3
    return request.post('/signup').send(data_post)
      .then(res => expect(res.statusCode).toEqual(204))
  })
})

describe('Test user.js autenticado', () => {

  test("Deve retornar statusCode 200 se conseguir alterar um user existente no BD", () => {
    // TODO: A rota /user_update tem que efetifamente realizar o update
    update_data = {
      ...credentials_admin,
      fk_roles_user: 2
    }

    return login(update_data).then(res => {
      request.put('/user_update')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(update_data).then(resp => expect(resp.statusCode).toEqual(204))
    })
    /***************************************************************************
    **                     Deste jeito também funciona                        **
    **  return request.post("/signin")                                        **
    **    .send(update_data)                                                  **
    **    .then(res => {                                                      **
    **      request.put('/user_update')                                       **
    **    .set('Authorization', 'Bearer ' + res.body.token)                   **
    **    .send(update_data).then(resp => expect(resp.statusCode).toEqual(204))*
    ***************************************************************************/
  })
})