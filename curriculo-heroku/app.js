const path = require("path");
const DBPATH = 'curriculo.db';

// Importa as configurações do app
require("dotenv").config({ encoding: "utf8", path: path.join(__dirname, ".env") });

const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })


const sqlite3 = require('sqlite3').verbose();
const app = express();


app.use(express.static("./frontend/"));
app.use(express.json());


/* Definição dos endpoints */


	 
	  
app.get('/projetos', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');

	var db = new sqlite3.Database(DBPATH);
  var sql = 'SELECT * FROM projetos ORDER BY nome COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		//res.json(rows);

		for(var i = 0; i < rows.length; i++)
		res.write('<div style="padding: 10px"><h2 style="font-size: 120%;">\n' + rows[i].nome + '</h2><span style="color: black; width: 300px">\n'+ rows[i].descrição +'</span></div>');

		
	});
	db.close();
});


app.post('/userinsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 

	sql = "INSERT INTO projetos (nome, descrição) VALUES ('" + req.body.nome + "', '" + req.body.descricao + "')";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close();
	res.end();
});

app.post('/projetosdelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
  
	sql = "DELETE FROM projetos WHERE nome = '" + req.body.nome +"'";
	console.log(sql)
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [], err => {
		if (err) {
			throw err;
		}
		else console.log(sql);
		res.end();  
	});
	db.close(); // Fecha o banco
  });

  app.post('/projetosupdate', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    sql = "UPDATE projetos SET nome = '" + req.body.nome + "' WHERE descrição = " + req.body.descricao;
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        else console.log(sql);
        res.end;
    });
    db.close(); // Fecha o banco
});

/* Inicia o servidor */



const server = app.listen(parseInt(process.env.PORT), process.env.IP, () => {
	console.log("Servidor executando na porta " + server.address().port);
});
