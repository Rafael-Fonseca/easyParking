
module.exports = app => {

  async function select(table, where, mode) {
    /***************************************************
    **    Retorna uma consulta ao banco de dados      **
    ** Parâmetros:                                    **
    ** table: str com o nome da tabela no banco       **
    ** where: Objeto que servirá como clausula where  **
    ** mode: str que representa o modo da consulta    **
    ***************************************************/
    try{
    if (mode === 'first') 
      return await app.db(table).where(where).first()
    }catch(err){
      console.log(err)
    }

  }


  async function insert(table, insert_data) {
    try{
    return await app.db(table).insert(insert_data)
    }catch(err){
      console.log(err)
    }
  }


  return { select, insert }
}