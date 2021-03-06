module.exports = app => {

  async function select(kwargs) {
    /***************************************************
    **    Retorna uma consulta ao banco de dados      **
    ** Parâmetro: {} keys demonstradas abaixo         **
    ** table: str com o nome da tabela no banco       **
    ** where: { coluna: value }                       **
    ** what: [ O que você quer receber da consulta ]  **
    ** mode: str que representa o modo da consulta    **
    ***************************************************/
    try {
      if (kwargs.where !== undefined) {
        if (kwargs.what === undefined) {
          if (kwargs.mode === 'first')
            return await app.db(kwargs.table).where(kwargs.where).first()
          return await app.db(kwargs.table).where(kwargs.where)

        } else {
          if (kwargs.mode === 'first')
            return await app.db(kwargs.table).where(kwargs.where).select(...kwargs.what).first()
          return await app.db(kwargs.table).where(kwargs.where).select(...kwargs.what)

        }

      } else { //Where indefinido, quero todas as linhas
        if (kwargs.what === undefined) { //What indefinido, quero todas as colunas
          return await app.db(kwargs.table)
        } else {
          return await app.db(kwargs.table).select(...kwargs.what)
        }
      }


    } catch (err) {
      console.log('\n\nOLHAAA O EEEEEERROOOO!!!!\n\nSelect DbHelper\n\n', kwargs)
      console.log('\n\nERR:\n\n', err)
      throw err
    }

  }


  async function insert(table, insert_data) {
    /*
    params:
    table: 'nome da tabela no bd'
    insert_data: {coluna_no_bd: value}

    return: null, apenas insere insert_data na tabela do banco de dados
    */
    try {
      return await app.db(table).insert(insert_data)
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  async function update(table, update_data, where) {
    /*
    params:
    table: 'nome da tabela no bd'
    update_data: {coluna_no_bd: value}
    where: {clausula where}

    return: null, apenas altera update_data na tabela do banco de dados
    */
    try {
      if (where !== undefined)
        return await app.db(table).where(where).update(update_data)
      else
        return await app.db(table).update(update_data)

    } catch (err) {
      console.log(err)
      throw err
    }
  }

  async function del(table, where) {
    try {
      return await app.db(table).where(where).del()
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  const to_timestamp = function (miliseconds) {
    //TODO: Está considerando outro timezone, arrumar para TZ BR
    return new Date(miliseconds).toLocaleString()
  }

  const time_limit = function (date) {
    const object_day = new Date(date)
    let diff = Math.abs(new Date() - object_day) //Dado em milisegundos
    let days_diff = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days_diff > 365 * 5 + 2 //5 anos + 2 dias para o pior caso.
  }

  return { select, insert, update, del, to_timestamp, time_limit }
}