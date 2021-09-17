// import app from "../src/App" Na real ele quer a aplicação express
// import supertest from "supertest"
// let request = supertest(app)

/*
TODO: Diretório para guardar os testes desta aplicação
Exemplo de sintaxe:
describe("Categoria", () => {

    test("Descrição", () => {
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

})
*/

//TODO: Teste auth.js
/*
describe("Test auth.js", () => {

    test("Deve retornar statusCode 200 se receber credenciais que confiram com o BD", () => {
        let credentials = {mail:'teste@gmail.com', password: '123456'}

        return request.post("/signin")
        .send(credentials)
        .then(res => {
            expect(res.statusCode).toEqual(200)

        }).catch(err =>{
            fail(err)
        })
    })

    test("Deve retornar statusCode 400 se o campo e-mail ou senha não for informado.", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se o campo e-mail ou senha estiver incorreto.", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 401 se o campo senha informado estiver errado.", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

})
*/

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

    test("Deve retornar statusCode 200 se conseguir persistir um novo user no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir alterar um user existente no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir recuperar um user existente no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 200 se conseguir remover um user no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir persistir um user no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir recuperar um user no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve retornar statusCode 400 se não conseguir alterar um user no BD", () => {
        // TODO: O teste
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

})

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