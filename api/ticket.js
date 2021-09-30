//TODO: Codigo referentes aos tickets
module.exports = app => {
  //Definição de variáveis globais desta rota
  table_tickets = 'tb_tickets'

  //Definição das funções desta rota
  const create = async (req, res) => {
    try {

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nticket.js - create\n\n', err)
      res.status(400).json(err)
    }
  }

  const read = async (req, res) => {
    try {

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nticket.js - read\n\n', err)
      res.status(400).json(err)
    }
  }

  const update = async (req, res) => {
    try {

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nticket.js - update\n\n', err)
      res.status(400).json(err)
    }
  }

  const del = async (req, res) => {
    try {

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nticket.js - del\n\n', err)
      res.status(400).json(err)
    }
  }

  return { create, read, update, del }
}