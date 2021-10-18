const payment = function(req, res) {
  if (req.body.num_cd % 2 == 0){
    res.status(200).json({
      'result': 'Pagamento realizado com sucesso.'
    })
  }else{
    res.status(299).json({
      'result': 'Erro, simulado, ao tentar executar o pagamento.'
    })
  }
}

module.exports = app => {
  app.post('/', payment)
}