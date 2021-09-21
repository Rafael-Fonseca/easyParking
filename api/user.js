const bcrypt = require('bcryptjs')

module.exports = app => {
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
            app.db('tb_users')
            .insert({
                name: `${req.body.name}`,
                cpf: `${req.body.cpf}`,
                mail: `${req.body.mail}`,
                password: `${password}`,
                fk_roles_user: 1,
                is_active: true,
                })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
        })
    }
    return {save}
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