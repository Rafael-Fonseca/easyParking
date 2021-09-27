//TODO: Codificar crud
module.exports = app => {
  //Definição de variáveis globais desta rota
  table_settings = 'tb_settings'

  //Definição das funções desta rota
  const create = async (req, res, next) => {
    try {

    } catch (e) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nsetting.js - create\t', e)

    }
  }

  const read = async (req, res, next) => {
    try {

    } catch (e) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nsetting.js - read\t', e)

    }
  }

  const update = async (req, res, next) => {
    try {

    } catch (e) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nsetting.js - update\t', e)

    }
  }

  const del = async (req, res, next) => {
    try {

    } catch (e) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nsetting.js - del\t', e)

    }
  }

  return { create, read, update, del }
}