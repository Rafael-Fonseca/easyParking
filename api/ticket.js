//TODO: Codigo referentes aos tickets
module.exports = app => {
  //Definição de variáveis globais desta rota
  table_tickets = 'tb_tickets'

  //Definição das funções desta rota
  const create = async (req, res, next) => {
    try {

    } catch (e) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nticket.js - create\t', e)

    }
  }

  const read = async (req, res, next) => {
    try {

    } catch (e) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nticket.js - read\t', e)

    }
  }

  const update = async (req, res, next) => {
    try {

    } catch (e) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nticket.js - update\t', e)

    }
  }

  const del = async (req, res, next) => {
    try {

    } catch (e) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nticket.js - del\t', e)

    }
  }

  return { create, read, update, del }
}