//TODO: Codigo referentes aos tickets
module.exports = app => {
  //Definição de variáveis globais desta rota
  table_tickets = 'tb_tickets'

  //Definição das funções desta rota
  const time_limit = function (date) {
    const ticket_day = new Date(date)
    let diff = Math.abs(new Date() - ticket_day) //Dado em milisegundos
    let days_diff = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days_diff > 365 * 5 + 2 //5 anos + 2 dias para o pior caso.
  }

  const create = async (req, res) => {
    try {

      //PREPARA A INFORMAÇÃO
      const create_data = { tme_start: app.api.dbHelper.to_timestamp(req.body.tme_start) }

      //ATENDE A REQUISIÇÃO
      app.api.dbHelper.insert(table_tickets, create_data)
      res.status(200).send()


    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nticket.js - create\n\n', err)
      res.status(400).json(err)
    }
  }

  const read = async (req, res) => {
    try {
      const result = await app.api.dbHelper.select({
        table: table_tickets,
        where: { pk_bar_code: req.body.target_pk_bar_code }
      })

      if (Object.keys(result).length > 0) {
        res.status(200).send()
        return result
      } else {
        res.status(400).send('Ticket não encontrado na base de dados')
      }


    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nticket.js - read\n\n', err)
      res.status(400).json(err)
    }
  }

  const update = async (req, res) => {
    try {
      if (req.body.tme_start === undefined) {

        //INICIO CONSTRUÇÃO update_data - Este objeto indica o que será alterado
        let update_data = {}
        if (req.body.fk_user !== undefined)
          update_data.fk_user = req.body.fk_user

        if (req.body.tme_end !== undefined)
          update_data.tme_end = app.api.dbHelper.to_timestamp(req.body.tme_end)

        if (req.body.tme_exit !== undefined)
          update_data.tme_exit = app.api.dbHelper.to_timestamp(req.body.tme_exit)
        // FIM DA CONSTRUÇÃO update_data

        //Prepara objeto que representa a cláusula where
        const where = { pk_bar_code: req.body.target_pk_bar_code }

        //ATENDE A REQUISIÇÃO
        app.api.dbHelper.update(table_tickets, update_data, where)
        res.status(200).send()
        
      }else{
        res.status(400).send('Não se pode alterar a data de início.')
      }


    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nticket.js - update\n\n', err)
      res.status(400).json(err)
    }
  }

  const del = async (req, res) => {
    try {
      if (time_limit) {
        app.api.dbHelper.del(table_tickets, { pk_bar_code: req.body.target_pk_bar_code })
        res.status(200).send()

      } else {
        res.status(400).send('A deleção só é permitida após 5 anos.')
      }

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\nticket.js - del\n\n', err)
      res.status(400).json(err)
    }
  }

  return { create, read, update, del }
}