//Exporta os middlewares para o cors
const cors = require('cors')
const express = require('express')


module.exports = app => {
    app.use(express.json({limit:'50mb'}));
    app.use(express.urlencoded({ extended: true, limit:'50mb' }));
    app.use(cors({
        origin: '*'
    }))
}