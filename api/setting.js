//TODO: Codificar crud
module.exports = app => {
  //Definição de variáveis globais desta rota
  table_settings = 'tb_settings'

  //Definição das funções desta rota
  const create = async (req, res) => {
    try {

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nsetting.js - create\n\n', err)
      res.status(400).json(err)
    }
  }

  const read = async (req, res) => {
    try {

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nsetting.js - read\n\n', err)
      res.status(400).json(err)
    }
  }

  const update = async (req, res) => {
    try {

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nsetting.js - update\n\n', err)
      res.status(400).json(err)
    }
  }

  const del = async (req, res) => {
    try {

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nsetting.js - del\n\n', err)
      res.status(400).json(err)

    }
  }

  return { create, read, update, del }
}