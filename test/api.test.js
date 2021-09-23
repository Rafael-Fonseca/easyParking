import app, { response } from "../index"
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

admin = {
  mail: 'Raf',
  password: '123'
}


//TODO: Teste auth.js
describe("Test auth.js", () => {

  test("Deve retornar statusCode 200 se receber credenciais que confiram com o BD", () => {
    let credentials = { mail: 'Raf', password: '123' }

    return request.post("/signin")
      .send(credentials)
      .then(res => {
        expect(res.statusCode).toEqual(200)
      })
  })

  test("Deve retornar statusCode 400 se o campo e-mail ou senha não for informado.", () => {
    //let credentials = {password: '123' }
    let credentials = { mail: 'test@mail.com' }


    return request.post("/signin")
      .send(credentials)
      .then(res => {
        expect(res.statusCode).toEqual(400)
      })
  })

  test("Deve retornar statusCode 401 se o campo senha estiver incorreto.", () => {
    let credentials = { mail: 'Raf', password: '1234' }

    return request.post("/signin")
      .send(credentials)
      .then(res => {
        expect(res.statusCode).toEqual(401)
      })
  })

  test("Deve retornar statusCode 400 se o campo e-mail informado estiver errado.", () => {
    let credentials = { mail: 'Rafa', password: '123' }

    return request.post("/signin")
      .send(credentials)
      .then(res => {
        expect(res.statusCode).toEqual(400)
      })
  })

  test("Deve retornar statusCode 400 se os campos e-mail e senha informados estiverem errados.", () => {
    let credentials = { mail: 'Rafa', password: '1234' }

    return request.post("/signin")
      .send(credentials)
      .then(res => {
        expect(res.statusCode).toEqual(400)
      })
  })

})

//TODO: Teste card.js
/*
describe("Test card.js", () => {

    test("Deve retornar statusCode 200 se conseguir persistir um novo cartão no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir alterar um cartão existente no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir recuperar um cartão existente no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir remover um cartão no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir persistir um cartão no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

})
*/
//TODO: Teste offer.js
/*
describe("Test offer.js", () => {

    test("Deve retornar statusCode 200 se conseguir persistir uma nova oferta no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir alterar uma oferta existente no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir recuperar uma oferta existente no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir remover uma oferta no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir persistir uma oferta no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir recuperar uma oferta no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir alterar uma oferta no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

})
*/
//TODO: Teste payment.js
/*
describe("Test payment.js", () => {

    test("Deve retornar statusCode 200 se conseguir realizar um pagamento", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir realizar um pagamento", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

})
*/
//TODO: Teste ticket.js
/*

describe("Test ticket.js", () => {

    test("Deve retornar statusCode 200 se conseguir persistir um novo ticket no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir alterar um ticket existente no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir recuperar um ticket existente no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir remover um ticket no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir persistir um ticket no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir recuperar um ticket no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir alterar um ticket no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

})
*/

//TODO: Teste user.js
describe("Test user.js", () => {

  test("Deve retornar statusCode 204 se conseguir persistir um novo user no BD", () => {
    setInterval(pass_time, 1000)
    data_post = create_user_data()
    return request.post('/signup').send(data_post)
      .then(res => expect(res.statusCode).toEqual(204))
  })

  test("Deve retornar statusCode 204 se conseguir persistir um novo admin no BD", () => {
    setInterval(pass_time, 1000)
    data_post = create_user_data()
    data_post.fk_roles_user = 2
    return request.post('/signup').send(data_post)
      .then(res => expect(res.statusCode).toEqual(204))
  })

  test("Deve retornar statusCode 204 se conseguir persistir um novo empregado no BD", () => {
    setInterval(pass_time, 1000)
    data_post = create_user_data()
    data_post.fk_roles_user = 3
    return request.post('/signup').send(data_post)
      .then(res => expect(res.statusCode).toEqual(204))
  })
})

describe('Test user.js autenticado', () => {

  login = async function pre_previus_auth() {
    let credentials = { mail: 'Raf', password: '123' }
    resp = await Promise.resolve(request.post("/signin").send(credentials))
    // console.log('como assim não existe?', resp.body.token)
    return resp.body.token
  }

  test("Deve retornar statusCode 200 se conseguir alterar um user existente no BD", () => {
    // TODO: O teste
    get_token = async function previus_auth(token) {
      try {
        token = await login().then(res => console.log('ASYNC - GET TOKEN!!!!! ', res))
      } catch (err) {
        token = 'Linha por volta de 294 ' + err
      }
      return token
    }
    token0 = 'eta'
    token = get_token(token0).then(res_fim => console.log('OLHA NOIS AKI!!! ', res_fim))
    expect(token).toEqual(300)
  })

  // test("Deve retornar statusCode 200 se conseguir recuperar um user existente no BD", () => {
  //   // TODO: O teste
  //   let recebi_do_sistema = 0
  //   expect(recebi_do_sistema).toEqual('O que eu espero receber')
  // })

  // test("Deve retornar statusCode 200 se conseguir remover um user no BD", () => {
  //   // TODO: O teste
  //   let recebi_do_sistema = 0
  //   expect(recebi_do_sistema).toEqual('O que eu espero receber')
  // })

  // test("Deve retornar statusCode 400 se não conseguir persistir um user no BD", () => {
  //   // TODO: O teste
  //   let recebi_do_sistema = 0
  //   expect(recebi_do_sistema).toEqual('O que eu espero receber')
  // })

  // test("Deve retornar statusCode 400 se não conseguir recuperar um user no BD", () => {
  //   // TODO: O teste
  //   let recebi_do_sistema = 0
  //   expect(recebi_do_sistema).toEqual('O que eu espero receber')
  // })

  // test("Deve retornar statusCode 400 se não conseguir alterar um user no BD", () => {
  //   // TODO: O teste
  //   let recebi_do_sistema = 0
  //   expect(recebi_do_sistema).toEqual('O que eu espero receber')
  // })
})
// })

//TODO: Teste company.js
/*
describe("Test company.js", () => {

    test("Deve retornar statusCode 200 se conseguir persistir uma nova empresa no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir alterar uma empresa existente no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir recuperar uma empresa existente no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir remover uma empresa no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir persistir uma empresa no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir recuperar uma empresa no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir alterar uma empresa no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

})
*/
//TODO: Teste role.js
/*
describe("Test role.js", () => {

    test("Deve retornar statusCode 200 se conseguir persistir uma nova função no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir alterar uma função existente no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir recuperar uma função existente no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir remover uma função no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir persistir uma função no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir recuperar uma função no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir alterar uma função no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

})
*/
//TODO: Teste settings.js
/*

describe("Test setting.js", () => {

    test("Deve retornar statusCode 200 se conseguir persistir uma nova configuração no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir alterar uma configuração existente no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })
    test("Deve retornar statusCode 200 se conseguir recuperar uma configuração existente no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir remover uma configuração no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir persistir uma configuração no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir recuperar uma configuração no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir alterar uma configuração no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

})
*/
//TODO: Teste user_ticket.js
/*

describe("Test user_ticket.js", () => {

    test("Deve retornar statusCode 200 se conseguir persistir uma nova associação user-ticket no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir alterar uma associação user-ticket existente no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir recuperar uma associação user-ticket existente no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir remover uma associação user-ticket no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir persistir uma associação user-ticket no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir recuperar uma associação user-ticket no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir alterar uma associação user-ticket no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

})
*/