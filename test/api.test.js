let app = require("../src/app")
let supertest = require("supertest")
let request = supertest(app)

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
describe("Test auth.js", () => {

    test("Deve retornar true se receber credenciais que confiram com o BD", () => {
        let credentials = {mail:'teste@gmail.com', password: '123456'}

        return request.post("/signin")
        .send(credentials)
        .then(res => {
            expect(res.statusCode).toEqual(200)

        }).catch(err =>{
            fail(err)
        })
    })

    test("Deve possuir statusCode 400 se o campo e-mail ou senha não for informado.", () => {
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve possuir statusCode 400 se o campo e-mail ou senha estiver incorreto.", () => {
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

    test("Deve possuir statusCode 401 se o campo senha informado estiver errado.", () => {
        let recebi_do_sistema = 0
        expect(recebi_do_sistema).toEqual('O que eu espero receber')
    })

})