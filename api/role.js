const { authSecret } = require('../.env')
const jwt = require('jwt-simple')

//TODO: Codificar crud
module.exports = app => {
    table = 'td_roles'

    const save = (req, res) => {
        const decoded = jwt.decode(req.header('Authorization'), authSecret)
        
        

    }

    return { save }
}