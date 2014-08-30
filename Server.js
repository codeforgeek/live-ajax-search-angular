/*
	Title		: 	Live Ajax Search using Angular.js and Node.js.
	Author	 	: 	Shahid Shaikh
	Contact 	: 	shahid@codeforgeek.com
*/

/*Step 1 : Loading All dependencies.*/
var express	=	require('express');
var app		=	express();
var mysql	=	require('mysql');


/*Defining Database connection such as user name, password and database.*/
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'demos'
});

connection.connect(function(){
	console.log("<== MySQL Database is Connected ==>");
});

/*
	* Here we are setting the front end environment.
	* We are telling express to use files from these folders.
	* This helps us to structure the app in better way.
*/
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/',function(req,res){
	
	res.render('index.html');

});

/*
	* Here we are loading every content from data base and sending it back to Client in JSON format.
	* We cannot send it without JSON because Angular do not understand raw data.
*/
app.get('/load',function(req,res){
	console.log("<== We are going to load data from Table ==>");
	connection.query("select * from cfg_demos",function(err,rows,fields){
		if(err)	throw err;		
		console.log("<== Data is been loaded. ==>");
		res.end(JSON.stringify(rows));	
		console.log("<== Data is been sent to Client. ==>");				
	});

});

/*Starting our app at localhost with PORT 7001.*/
app.listen(7001,function(){
		console.log("<== App is started at PORT 7001 ==>");
});
