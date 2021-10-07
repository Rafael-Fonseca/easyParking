module.exports = app => {
  //Definição de variáveis globais desta rota
  table_cards = 'tb_cards'

  //Definição das funções desta rota
  const card_from_user = async function (card_pk, pk_user) {
    try {
      let kwargs = {
        table: table_cards,
        what: ['fk_users_card'],
        where: { pk_card: card_pk },
        mode: 'first'
      }
      result = await app.api.dbHelper.select(kwargs)
      return (result.fk_users_card === pk_user)

    } catch (e) {
      console.log('\n\nOLHAAA O EEEEEERROOOO!!!!\n\card.js card_from_user\n\n', e)
    }
  }

  const create = async (req, res) => {

    try {

      if ( //TODOS OS CAMPOS ESTÃO PREENCHIDOS?
        req.body.num_cd !== undefined &&
        req.body.nme_cd_holder !== undefined &&
        req.body.validity !== undefined &&
        req.body.credit !== undefined) {

        //CAPTURA PK DO REQUERENTE
        const pk_requester = app.api.authHelper.get_pk_user(req)

        //MONTA OBJETO A SER INSERIDO NO BD 
        const card_data = {
          fk_users_card: pk_requester,
          num_cd: `${app.api.securityHelper.encrypt(req.body.num_cd)}`,
          nme_cd_holder: `${app.api.securityHelper.encrypt(req.body.nme_cd_holder)}`,
          validity: `${app.api.securityHelper.encrypt(req.body.validity)}`,
          credit: `${req.body.credit}`,
          nme_cd: req.body.nme_cd || req.body.num_cd.slice(-4),
        }

        // MANDA INSERIR E RESPONDE A REQUISIÇÃO
        app.api.dbHelper.insert(table_cards, card_data)
          .then(_ => res.status(204).send())
          .catch(err => res.status(400).json(err))

      } else { // FALTOU CAMPO OBRIGATÓRIO, RECUSA A REQUISIÇÃO
        res.status(400).send('Existem campos obrigatórios não preenchidos.')
      }

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\ncard.js - create\t', err)
      res.status(400).json(err)
    }
  }

  const read = async (req, res) => {
    try {
      // DESCUBRA QUEM É O REQUISITANTE
      pk_requester = app.api.authHelper.get_pk_user(req)

      //MONTAR PARÂMETRO DO SELECT
      let kwargs = {
        table: table_cards,
        where: { fk_users_card: pk_requester }
      }

      //DEVOLVA TODOS OS CARTÕES DESTE REQUISITANTE
      cards = await app.api.dbHelper.select(kwargs)

      cards.forEach(function (card) {
        card.num_cd = app.api.securityHelper.decrypt(card.num_cd)
        card.validity = app.api.securityHelper.decrypt(card.validity)
        card.nme_cd_holder = app.api.securityHelper.decrypt(card.nme_cd_holder)
      })
      
      console.log('\n\n\nCards', cards, '\n\n\n')



      res.status(200).json(cards)

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\ncard.js - read\t', err)
      res.status(400).json(err)
    }
  }

  const update = async (req, res) => {
    try {

      //DESCUBRA QUEM É O REQUISITANTE
      const pk_requester = app.api.authHelper.get_pk_user(req)

      //SE TARGET_PK_CARD POSSUI FK_USERS_CARD === PK_REQUESTER DBHELPER(cardFromUser)
      if (await card_from_user(req.body.pk_card, pk_requester)) {

        //INICIO CONSTRUÇÃO update_data - Este objeto indica o que será alterado
        let update_data = {}
        if (req.body.num_cd !== undefined)
          update_data.num_cd = req.body.num_cd

        if (req.body.nme_cd_holder !== undefined)
          update_data.nme_cd_holder = req.body.nme_cd_holder

        if (req.body.validity !== undefined)
          update_data.validity = req.body.validity

        if (req.body.credit !== undefined)
          update_data.credit = req.body.credit

        if (req.body.nme_cd !== undefined ||
          req.body.num_cd !== undefined)
          update_data.nme_cd = req.body.nme_cd || req.body.num_cd.slice(-4)
        // FIM DA CONSTRUÇÃO update_data

        let where = { pk_card: req.body.pk_card }

        //REALIZA A ALTERAÇÃO, E INFORME QUE A REQUISIÇÃO FOI ATENDIDA
        app.api.dbHelper.update(table_cards, update_data, where)
        res.status(200).send()

      } else {

        //REJEITE ESTA REQUISIÇÃO, APENAS O DONO DO CARTÃO PODE REALIZAR ALTERAÇÕES
        res.status(400).send('Apenas o dono do cartão pode realizar esta operação')
      }
    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\ncard.js - update\n\n', err)
      res.status(400).json(err)
    }
  }

  const del = async (req, res) => {

    try {

      //DESCOBRIR O REQUERENTE
      pk_requester = app.api.authHelper.get_pk_user(req)

      //CONFERIR SE O CARTÃO A SER DELETADO É DO REQUERENTE
      if (await card_from_user(req.body.pk_card, pk_requester)) {

        //SE SIM, DELETE E INFORME QUE A REQUISIÇÃO FOI ACEITA
        app.api.dbHelper.del(table_cards, { pk_card: req.body.pk_card })
        res.status(200).send()

      } else {
        //SE NÃO, NEGUE A REQUISIÇÃO
        res.status(400).send('Apenas o dono do cartão pode realizar esta ação.')
      }

    } catch (err) {
      console.log('\n\nEEEEEEERRRRROOOOO!!!\n\ncard.js - del\t', err)
      res.status(400).json(err)
    }
  }

  return { create, read, update, del }
}