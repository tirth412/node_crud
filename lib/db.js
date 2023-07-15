var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
	user:'root',
	password:'',
	database:'node_db'
})

connection.connect(function (error) {
    if(!!error) {
        console.log(error);
    }else{
        console.log('Database connected succesfully');
    }
})

module.exports = connection;