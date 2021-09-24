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

login = async function (user) {
  return request.post("/signin").send(user)
}

// //TODO: Teste role.js
// describe("Test role.js", () => {

//     test("Deve retornar statusCode 201 se conseguir persistir uma nova 'role' no BD", () => {
//         // TODO: O teste
//         const data_role = { role: 'admin_test', discount: 1, is_active: true }
//         return request.post('/roles_create').send(data_role).then(res =>
//           expect(res.statusCode).toEqual(201))
//     })

//     test("Deve retornar statusCode 200 se conseguir alterar uma função existente no BD", () => {
//         // TODO: O teste
//         let recebi_do_sistema = 0
//         expect(recebi_do_sistema).toEqual('O que eu espero receber')
//     })

//     test("Deve retornar statusCode 200 se conseguir recuperar uma função existente no BD", () => {
//         // TODO: O teste
//         let recebi_do_sistema = 0
//         expect(recebi_do_sistema).toEqual('O que eu espero receber')
//     })

//     test("Deve retornar statusCode 200 se conseguir remover uma função no BD", () => {
//         // TODO: O teste
//         let recebi_do_sistema = 0
//         expect(recebi_do_sistema).toEqual('O que eu espero receber')
//     })

//     test("Deve retornar statusCode 400 se não conseguir persistir uma função no BD", () => {
//         // TODO: O teste
//         let recebi_do_sistema = 0
//         expect(recebi_do_sistema).toEqual('O que eu espero receber')
//     })

//     test("Deve retornar statusCode 400 se não conseguir recuperar uma função no BD", () => {
//         // TODO: O teste
//         let recebi_do_sistema = 0
//         expect(recebi_do_sistema).toEqual('O que eu espero receber')
//     })

//     test("Deve retornar statusCode 400 se não conseguir alterar uma função no BD", () => {
//         // TODO: O teste
//         let recebi_do_sistema = 0
//         expect(recebi_do_sistema).toEqual('O que eu espero receber')
//     })

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
    // TODO: A rota /update_user tem que efetifamente realizar o update
    update_data = {
      ...credentials_admin,
      fk_roles_user: 2
    }

    return login(update_data).then(res => {
      request.put('/update_user')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(update_data).then(resp => expect(resp.statusCode).toEqual(204))
    })
    /***************************************************************************
    **                     Deste jeito também funciona                        **
    **  return request.post("/signin")                                        **
    **    .send(update_data)                                                  **
    **    .then(res => {                                                      **
    **      request.put('/update_user')                                       **
    **    .set('Authorization', 'Bearer ' + res.body.token)                   **
    **    .send(update_data).then(resp => expect(resp.statusCode).toEqual(204))*
    ***************************************************************************/
  })
})