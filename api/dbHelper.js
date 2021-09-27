
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

      }else{ // Where não foi definido, quero todos os resultados
        if (kwargs.what === undefined) {
          return await app.db(kwargs.table)
        }else{
          return await app.db(kwargs.table).select(...kwargs.what)
        }
      }


    } catch (err) {
      console.log('\n\nOLHAAA O EEEEEERROOOO!!!!\n\nSelect DbHelper\n\n', kwargs)
      console.log('\n\nERR:\n\n', err)
    }

  }

  async function sel_innerjoin(kwargs) {
    //TODO: Função ainda não usada, nem testada
    try {
      if (kwargs.what === undefined) {
        app.db(kwargs.table)
          .innerJoin(kwargs.other_table, kwargs.key_table,
            kwargs.signal, kwargs.key_other_table)
          .where(kwargs.where)

      } else {
        app.db(kwargs.table)
          .innerJoin(kwargs.other_table, kwargs.key_table,
            kwargs.signal, kwargs.key_other_table)
          .select(...kwargs.what)
          .where(kwargs.where)


      }

    } catch (err) {
      console.log(err)
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
    }
  }

  async function update(table, update_data, where) {
    /*
    params:
    table: 'nome da tabela no bd'
    insert_data: {coluna_no_bd: value}
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
    }
  }


  return { select, insert, sel_innerjoin, update }
}