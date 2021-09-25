
module.exports = app => {

  async function select(kwargs) {
    /***************************************************
    **    Retorna uma consulta ao banco de dados      **
    ** Parâmetros:                                    **
    ** table: str com o nome da tabela no banco       **
    ** where: Objeto que servirá como clausula where  **
    ** mode: str que representa o modo da consulta    **
    ***************************************************/
    try {
      if (kwargs.what === undefined) {
        if (kwargs.mode === 'first')
          return await app.db(kwargs.table).where(kwargs.where).first()

      } else {
        if (kwargs.mode === 'first')
          return await app.db(kwargs.table).where(kwargs.where).select(...kwargs.what).first()
      }

    } catch (err) {
      console.log(err)
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
    try {
      return await app.db(table).insert(insert_data)
    } catch (err) {
      console.log(err)
    }
  }


  return { select, insert, sel_innerjoin }
}