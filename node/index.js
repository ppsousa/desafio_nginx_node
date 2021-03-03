const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql')


app.get('/', (req, res) => {

  const connection = mysql.createConnection(config);

  var sql = `TRUNCATE TABLE people`
  connection.query(sql)

  sql = `INSERT INTO people(name) values('Paulo Pereira')`
  connection.query(sql)
  sql = `INSERT INTO people(name) values('Juliana Pires')`
  connection.query(sql)
  sql = `INSERT INTO people(name) values('José Bonifácio')`
  connection.query(sql)
  sql = `INSERT INTO people(name) values('Maria Antonieta')`
  connection.query(sql)
  
  var ret = "<h1>Full Cycle</h1>" + "\r\n";
  connection.query("SELECT name FROM people", function (err, result, fields) {
     if (err) throw err;
     Object.keys(result).forEach(function(key) {
       ret = ret + "<h3>" + result[key].name + "</h3>" +  "\r\n";
     })
     connection.end()
     res.send(ret)
     return
  });  

})

app.listen(port,()=>{
  console.log('Rodando na porta '+port)
})