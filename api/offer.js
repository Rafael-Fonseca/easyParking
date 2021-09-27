//TODO: Codificar crud
module.exports = app => {
  //Definição de variáveis globais em app
  table_offers = 'tb_offers'

  //Definição das funções desta rota
  const create = async (req, res, next) => {
    try {

    } catch (e) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\noffer.js - create\t', e)

    }
  }

  const read = async (req, res, next) => {
    try {

    } catch (e) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\noffer.js - read\t', e)

    }
  }

  const update = async (req, res, next) => {
    try {

    } catch (e) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\noffer.js - update\t', e)

    }
  }

  const del = async (req, res, next) => {
    try {

    } catch (e) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\noffer.js - del\t', e)

    }
  }

  return { create, read, update, del }
}