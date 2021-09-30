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
  // name:'adminTest',
  // cpf:'cpfAdmin',
  mail: 'admin@mail',
  password: '123'
}

credentials_user = {
  // name:'userTest',
  // cpf:'cpfUser',
  mail: 'user@mail',
  password: '123'
}

credentials_employee = {
  // name:'employeeTest',
  // cpf:'cpfEmploy',
  mail: 'employee@mail',
  password: '123'
}

login = async function (user) {
  return request.post("/signin").send(user)
}

/*
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
*/

/*
describe("Test auth.js", () => {

  test("Deve retornar statusCode 200 se receber credenciais que confiram com o BD", () => {
    let credentials = { mail: 'admin@mail', password: '123' }
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
    let credentials = { mail: 'admin@mail', password: '1234' }
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
*/


/*
describe("Test user.js", () => {

  test("Deve retornar statusCode 204 se conseguir persistir um novo user no BD", () => {
    setInterval(pass_time, 1000)
    data_post = create_user_data()
    data_post.name = 'userTest'
    data_post.cpf = 'cpfUser'
    data_post.mail = 'user@mail'
    data_post.password = '123'
    data_post.fk_roles_user = 1
    return request.post('/signup').send(data_post)
      .then(res => expect(res.statusCode).toEqual(204))
  })

  test("Deve retornar statusCode 204 se conseguir persistir um novo empregado no BD", () => {
    setInterval(pass_time, 1000)
    data_post = create_user_data()
    data_post.name = 'employeeTest'
    data_post.cpf = 'cpfEmploy'
    data_post.mail = 'employee@mail'
    data_post.password = '123'
    data_post.fk_roles_user = 2
    return request.post('/signup').send(data_post)
      .then(res => expect(res.statusCode).toEqual(204))
  })


  test("Deve retornar statusCode 204 se conseguir persistir um novo admin no BD", () => {
    setInterval(pass_time, 1000)
    data_post = create_user_data()
    data_post.name= 'adminTest'
    data_post.cpf= 'cpfAdmin'
    data_post.mail= 'admin@mail'
    data_post.password= '123'
    data_post.fk_roles_user = 3
    return request.post('/signup').send(data_post)
      .then(res => expect(res.statusCode).toEqual(204))
  })
})
*/

/*
describe('Test user.js autenticado', () => {

  test("Deve retornar statusCode 200 se um admin conseguir alterar um user no BD", () => {
    // TODO: A rota /user_update tem que efetifamente realizar o update
    // TODO: QUANDO REFAZER O BD VAI DAR ERRO, ALTERAR O PK_USER
    update_data = {
      target_pk_user: 4,
      // name: 'update_user_employee',
      // mail: 'não vou alterar pq é unique',
      fk_roles_user: 2,
      // cpf: 'Por enquanto não vou permitir esta alteração',
      // is_active: true,
    }

    return login(credentials_admin).then(res => {
      request.put('/user_update')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(update_data).then(resp => expect(resp.statusCode).toEqual(200))
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

/* //<<<<<<<< Dá problema por conta do comentário acima
  })

  test("Deve retornar statusCode 400 se um admin tentar alterar o nome de algum user no BD", () => {
    // TODO: A rota /user_update tem que efetifamente realizar o update
    // TODO: QUANDO REFAZER O BD VAI DAR ERRO, ALTERAR O PK_USER
    update_data = {
      target_pk_user: 4,
      name: 'update_user_employee',
      fk_roles_user: 3,
    }

    return login(credentials_admin).then(res => {
      request.put('/user_update')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(update_data).then(resp => expect(resp.statusCode).toEqual(400))
    })
  })

  test("Deve retornar statusCode 400 se um admin tentar alterar a senha de algum user no BD", () => {
    // TODO: A rota /user_update tem que efetifamente realizar o update
    // TODO: QUANDO REFAZER O BD VAI DAR ERRO, ALTERAR O PK_USER
    update_data = {
      target_pk_user: 4,
      password: 'not_allowed',
      fk_roles_user: 3,
    }

    return login(credentials_admin).then(res => {
      request.put('/user_update')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(update_data).then(resp => expect(resp.statusCode).toEqual(400))
    })
  })

  test("Deve retornar statusCode 400 se um admin tentar alterar o email de algum user no BD", () => {
    // TODO: A rota /user_update tem que efetifamente realizar o update
    // TODO: QUANDO REFAZER O BD VAI DAR ERRO, ALTERAR O PK_USER
    update_data = {
      target_pk_user: 4,
      mail: 'not_allowed@mail',
      fk_roles_user: 3,
    }

    return login(credentials_admin).then(res => {
      request.put('/user_update')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(update_data).then(resp => expect(resp.statusCode).toEqual(400))
    })
  })

  test("Deve retornar statusCode 400 se um admin tentar alterar o cpf de algum user no BD", () => {
    // TODO: A rota /user_update tem que efetifamente realizar o update
    // TODO: QUANDO REFAZER O BD VAI DAR ERRO, ALTERAR O PK_USER
    update_data = {
      target_pk_user: 4,
      fk_roles_user: 3,
      cpf: '999999888',
    }

    return login(credentials_admin).then(res => {
      request.put('/user_update')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(update_data).then(resp => expect(resp.statusCode).toEqual(400))
    })
  })

  test("Deve retornar statusCode 400 se um admin tentar alterar o is_active de algum user no BD", () => {
    // TODO: A rota /user_update tem que efetifamente realizar o update
    // TODO: QUANDO REFAZER O BD VAI DAR ERRO, ALTERAR O PK_USER
    update_data = {
      target_pk_user: 4,
      fk_roles_user: 3,
      is_active: false,
    }

    return login(credentials_admin).then(res => {
      request.put('/user_update')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(update_data).then(resp => expect(resp.statusCode).toEqual(400))
    })
  })

  test("Deve retornar statusCode 400 se um admin tentar alterar o nome de algum empregado no BD", () => {
    // TODO: A rota /user_update tem que efetifamente realizar o update
    // TODO: QUANDO REFAZER O BD VAI DAR ERRO, ALTERAR O PK_USER
    update_data = {
      target_pk_user: 4,
      name: 'update_user_employee',
      fk_roles_user: 3,
    }

    return login(credentials_admin).then(res => {
      request.put('/user_update')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(update_data).then(resp => expect(resp.statusCode).toEqual(400))
    })
  })

  test("Deve retornar statusCode 400 se um admin tentar alterar a senha de algum empregado no BD", () => {
    // TODO: A rota /user_update tem que efetifamente realizar o update
    // TODO: QUANDO REFAZER O BD VAI DAR ERRO, ALTERAR O PK_USER
    update_data = {
      target_pk_user: 4,
      password: 'not_allowed',
      fk_roles_user: 3,
    }

    return login(credentials_admin).then(res => {
      request.put('/user_update')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(update_data).then(resp => expect(resp.statusCode).toEqual(400))
    })
  })

  test("Deve retornar statusCode 400 se um admin tentar alterar o email de algum empregado no BD", () => {
    // TODO: A rota /user_update tem que efetifamente realizar o update
    // TODO: QUANDO REFAZER O BD VAI DAR ERRO, ALTERAR O PK_USER
    update_data = {
      target_pk_user: 4,
      mail: 'not_allowed@mail',
      fk_roles_user: 3,
    }

    return login(credentials_admin).then(res => {
      request.put('/user_update')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(update_data).then(resp => expect(resp.statusCode).toEqual(400))
    })
  })

  test("Deve retornar statusCode 400 se um admin tentar alterar o cpf de algum empregado no BD", () => {
    // TODO: A rota /user_update tem que efetifamente realizar o update
    // TODO: QUANDO REFAZER O BD VAI DAR ERRO, ALTERAR O PK_USER
    update_data = {
      target_pk_user: 4,
      fk_roles_user: 3,
      cpf: '999999777',
    }

    return login(credentials_admin).then(res => {
      request.put('/user_update')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(update_data).then(resp => expect(resp.statusCode).toEqual(400))
    })
  })

  test("Deve retornar statusCode 400 se um admin tentar alterar o is_active de algum empregado no BD", () => {
    // TODO: A rota /user_update tem que efetifamente realizar o update
    // TODO: QUANDO REFAZER O BD VAI DAR ERRO, ALTERAR O PK_USER
    update_data = {
      target_pk_user: 4,
      fk_roles_user: 3,
      is_active: false,
    }

    return login(credentials_admin).then(res => {
      request.put('/user_update')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(update_data).then(resp => expect(resp.statusCode).toEqual(400))
    })
  })

  test("Deve retornar statusCode 200 se um user conseguir recuperar seus dados no BD", () => {
    return login(credentials_user).then(res => {
      request.post('/user_read')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send().then(res => expect(res.statusCode).toEqual(200))
    })
  })

  test("Deve retornar statusCode 400 se um user tentar recuperar dados de outro user no BD", () => {
    let target_user = { target_pk_user: 4 }
    return login(credentials_user).then(res => {
      request.post('/user_read')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(target_user).then(res => expect(res.statusCode).toEqual(400))
    })
  })

  test("Deve retornar statusCode 400 se um empregado tentar recuperar dados de outro user no BD", () => {
    let target_user = { target_pk_user: 4 }
    return login(credentials_employee).then(res => {
      request.post('/user_read')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(target_user).then(res => expect(res.statusCode).toEqual(400))
    })
  })

  test("Deve retornar statusCode 200 se um admin conseguir recuperar todos os usuários existentes no BD", () => {
    return login(credentials_admin).then(res => {
      request.post('/user_read')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send().then(res => expect(res.statusCode).toEqual(200))
    })
  })

  test("Deve retornar statusCode 200 se um user conseguir se remover do BD", () => {
    return login(credentials_user).then(res => {
      request.post('/user_delete')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send().then(res => expect(res.statusCode).toEqual(200))
    })
  })

  test("Deve retornar statusCode 200 se um employee conseguir se remover do BD", () => {
    return login(credentials_employee).then(res => {
      request.post('/user_delete')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send().then(res => expect(res.statusCode).toEqual(200))
    })
  })

  test("Deve retornar statusCode 200 se um admin conseguir se remover do BD", () => {
    return login(credentials_admin).then(res => {
      request.post('/user_delete')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send().then(res => expect(res.statusCode).toEqual(200))
    })
  })

  test("Deve retornar statusCode 400 se um user tentar remover outro user do BD", () => {
    return login(credentials_user).then(res => {
      request.post('/user_delete')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send({ target_pk_user: 4 }).then(res => expect(res.statusCode).toEqual(400))
    })
  })

  test("Deve retornar statusCode 200 se um admin conseguir remover outro user no BD", () => {
    return login(credentials_admin).then(res => {
      request.post('/user_delete')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send({ target_pk_user: 4 }).then(res => expect(res.statusCode).toEqual(200))
    })
  })

  test("Deve retornar statusCode 400 se não conseguir persistir um user no BD", () => {
    incomplete_credentials = {name:'incompleto', mail:'incompleto@mail'}
    return request.post('/signup').send(incomplete_credentials).then(res => {
      expect(res.statusCode).toEqual(400)
    })
  })

  // test("Deve retornar statusCode 400 se não conseguir recuperar um user no BD", () => {
  //   // TODO: Fazer este teste, quando eu tiver certeza do retorno das operações
  //   let recebi_do_sistema = 0
  //   expect(recebi_do_sistema).toEqual('O que eu espero receber')
  // })

})
*/

/*
describe("Test card.js", () => {

  test("Deve retornar statusCode 200 se conseguir persistir um novo cartão no BD", () => {
      let card_data = {
        num_cd: '0000111122223333',
        nme_cd_holder: 'pai do userTest',
        validity: '01/2022',
        credit: false,
      }
      return login(credentials_user).then(res => {
        request.post('/cards_create')
          .set('Authorization', 'Bearer ' + res.body.token)
          .send(card_data).then(res => expect(res.statusCode).toEqual(204))
      })
  })

  test("Deve retornar statusCode 200 se conseguir recuperar um cartão existente no BD", () => {
    return login(credentials_user).then(res => {
      request.post('/cards_read')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send().then(res => expect(res.statusCode).toEqual(200))
    })
  })

  test("Deve retornar statusCode 200 se conseguir alterar um cartão existente no BD", () => {
    let card_data = {
      pk_card: 1,
      num_cd: '0000111122224444',
      validity: '06/2023',
      credit: true,
    }
    return login(credentials_user).then(res => {
      request.put('/cards_update')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(card_data).then(res => expect(res.statusCode).toEqual(200))
    })
  })

  test("Deve retornar statusCode 200 se conseguir remover um cartão no BD", () => {
    let card_to_delete = { pk_card: 2 }
    return login(credentials_user).then(res => {
      request.delete('/cards_delete')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(card_to_delete).then(res => expect(res.statusCode).toEqual(200))
    })
  })

  test("Deve retornar statusCode 400 se não conseguir persistir um cartão no BD", () => {
      let incomplete_card = {
        nme_cd_holder: 'pai do userTest',
        validity: '01/2022',
        credit: false,
      }
      return login(credentials_user).then(res => {
        request.post('/cards_create')
          .set('Authorization', 'Bearer ' + res.body.token)
          .send(incomplete_card).then(res => expect(res.statusCode).toEqual(400))
      })
  })

})
*/


/*
describe("Test company.js", () => {

  test("Deve retornar statusCode 200 se conseguir persistir uma nova empresa no BD", () => {
      let company_data = {
        cnpj:'00111222000103',
        nme_company:'companyTest',
      }

      return ( login(credentials_admin).then(res => {
        request.post('/company_create')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(company_data)
        .then(res => expect(res.statusCode).toEqual(200))
      }))
  })

  test("Deve retornar statusCode 200 se conseguir alterar uma empresa existente no BD", () => {
      let company_data = {
        target_pk_company: 1,
        cnpj:'99888777000105',
        nme_company:'companyTestUpdate',
      }

      return ( login(credentials_admin).then(res => {
        request.put('/company_update')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(company_data)
        .then(res => expect(res.statusCode).toEqual(200))
      }))
  })

  test("Deve retornar statusCode 200 se conseguir recuperar as empresas existentes no BD", () => {
    let read_data = { table: 'tb_companies'}
    return ( login(credentials_admin).then(res => {
      request.post('/company_read')
      .set('Authorization', 'Bearer ' + res.body.token)
      .send(read_data)
      .then(res => expect(res.statusCode).toEqual(200))
    }))
  })

  test("Deve retornar statusCode 200 se conseguir remover uma empresa no BD", () => {
    let delete_data = { target_pk_company: 1}
    return ( login(credentials_admin).then(res => {
      request.post('/company_delete')
      .set('Authorization', 'Bearer ' + res.body.token)
      .send(delete_data)
      .then(res => expect(res.statusCode).toEqual(200))
    }))
  })

  test("Deve retornar statusCode 400 se não conseguir persistir uma empresa no BD", () => {
    let incomplete_company = {
      nme_company: 'companyTest',
    }

    return (login(credentials_admin).then(res => {
      request.post('/company_create')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(incomplete_company)
        .then(res => expect(res.statusCode).toEqual(400))
    }))
  })

  test("Deve retornar statusCode 400 se não conseguir recuperar uma empresa no BD", () => {
    let read_data = { table: 'tb_companies'}
    return ( login(credentials_user).then(res => {
      request.post('/company_read')
      .set('Authorization', 'Bearer ' + res.body.token)
      .send(read_data)
      .then(res => expect(res.statusCode).toEqual(400))
    }))
  })

  test("Deve retornar statusCode 400 se não conseguir alterar uma empresa no BD", () => {
      let company_data = {
        target_pk_company: 1,
        cnpj:'99888777000105',
        nme_company:'TestUserUpdateCompany',
      }

      return ( login(credentials_user).then(res => {
        request.put('/company_update')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(company_data)
        .then(res => expect(res.statusCode).toEqual(400))
      }))
  })

})
*/

/*
describe("Test offer.js", () => {

  test("Deve retornar statusCode 200 se conseguir persistir uma nova oferta no BD", () => {
    let offer_data = {
      fk_companies_offers: 1,
      tme_begin: Date.now(),
      tme_end: Date.now(),
      //img: Bitea
    }

    return ( login(credentials_admin).then(res => {
      request.post('/offer_create')
      .set('Authorization', 'Bearer ' + res.body.token)
      .send(offer_data)
      .then(res => expect(res.statusCode).toEqual(200))
    }))
  })

  test("Deve retornar statusCode 200 se conseguir alterar uma oferta existente no BD", () => {
    let offer_data = {
      target_pk_offer: 1,
      fk_companies_offers: 1,
      tme_begin: 1632950503185,
      tme_end: 1632950503185,
      //img: Bitea
    }

    return (login(credentials_admin).then(res => {
      request.put('/offer_update')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send(offer_data)
        .then(res => expect(res.statusCode).toEqual(200))
    }))
  })

  test("Deve retornar statusCode 200 se conseguir recuperar uma oferta existente no BD", () => {
    return (request.get('/offer_read')
        .send()
        .then(res => expect(res.statusCode).toEqual(200))
    )
  })

  test("Deve retornar statusCode 200 se conseguir remover uma oferta no BD", () => {
    const delete_data = {
      target_pk_offer: 1,
    }
    return login(credentials_admin).then(resp => {
      request.post('/offer_delete')
        .set('Authorization', 'Bearer ' + resp.body.token)
        .send(delete_data).then(res =>
          expect(res.statusCode).toEqual(200))
    })
  })

  test("Deve retornar statusCode 400 se não conseguir persistir uma oferta no BD", () => {
    let incomplete_offer_data = {
      fk_companies_offers: 1,
      tme_end: Date.now(),
    }

    return ( login(credentials_admin).then(res => {
      request.post('/offer_create')
      .set('Authorization', 'Bearer ' + res.body.token)
      .send(incomplete_offer_data)
      .then(res => expect(res.statusCode).toEqual(400))
    }))
  })

  test("Deve retornar statusCode 400 se não conseguir alterar uma oferta no BD", () => {
    let incomplete_offer_data = {
      fk_companies_offers: 1,
      tme_end: Date.now(),
    }

    return ( login(credentials_user).then(res => {
      request.put('/offer_update')
      .set('Authorization', 'Bearer ' + res.body.token)
      .send(incomplete_offer_data)
      .then(res => expect(res.statusCode).toEqual(400))
    }))
  })

})
*/

/*
describe("Test ticket.js", () => {

  test("Deve retornar statusCode 200 se conseguir persistir um ticket existente no BD", () => {
    let ticket_data = {
      tme_start: Date.now(),
    }

    return request.post('/ticket_create')
      .send(ticket_data)
      .then(res => expect(res.statusCode).toEqual(200))
  })

  test("Deve retornar statusCode 200 se conseguir alterar um ticket existente no BD", () => {
    let ticket_update = {
      target_pk_bar_code: 1,
      tme_end: Date.now(),
    }

    return request.put('/ticket_update')
      .send(ticket_update)
      .then(res => expect(res.statusCode).toEqual(200))
  })

  test("Deve retornar statusCode 200 se conseguir recuperar um ticket existente no BD", () => {
    let ticket_read = {
      target_pk_bar_code: 1,
    }

    return request.post('/ticket_read')
      .send(ticket_read)
      .then(res => expect(res.statusCode).toEqual(200))
  })

  test("Deve retornar statusCode 200 se conseguir remover um ticket no BD", () => {
    let ticket_delete = {
      target_pk_bar_code: 3,
    }

    return request.post('/ticket_delete')
      .send(ticket_delete)
      .then(res => expect(res.statusCode).toEqual(200))
  })

  test("Deve retornar statusCode 400 se não conseguir persistir um ticket no BD", () => {
    let ticket_data = {
      tme_end: Date.now(),
    }

    return request.post('/ticket_create')
      .send(ticket_data)
      .then(res => expect(res.statusCode).toEqual(400))
  })

  test("Deve retornar statusCode 400 se não conseguir recuperar um ticket no BD", () => {
    let ticket_read = {
      target_pk_bar_code: 100000000,
    }

    return request.post('/ticket_read')
      .send(ticket_read)
      .then(res => expect(res.statusCode).toEqual(400))
  })

  test("Deve retornar statusCode 400 se não conseguir alterar um ticket no BD", () => {
    let wrong_ticket_update = {
      target_pk_bar_code: 1,
      tme_start: new Date('1999-12-31').getTime(),
    }

    return request.put('/ticket_update')
      .send(wrong_ticket_update)
      .then(res => expect(res.statusCode).toEqual(400))
  })

})
*/


