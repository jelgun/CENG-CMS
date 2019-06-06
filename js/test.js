const mysql = require('mysql');

// First you need to create a connection to the db
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5588',
  database: 'CENG'
});
/*
con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});


$query = 'SELECT * FROM User';

con.query($query, function(err, rows) {
    if(err){
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
    }

    console.log("Query succesfully executed", rows);
});
*/

const rp = require('request-promise');
var url = 'http://ceng.iyte.edu.tr/people/#1509273723231-a94f5ba0-b99e';
const $ = require('cheerio');


rp(url)
  .then(function(html){

	var teachers = [];
    $('div[id=1509273723231-a94f5ba0-b99e] .stm-teacher__name', html).find('a').each(function (index, element) {
      teachers.push($(element).text());
    });
	
	url = 'http://ceng.iyte.edu.tr/people/#1509273723275-e66d8fee-ba28';
	

	rp(url)
		.then(function(html){
		//success!
			var assistants = [];
			$('div[id=1509273723275-e66d8fee-ba28] .stm-teacher__name', html).find('a').each(function (index, element) {
				assistants.push($(element).text());
			});
			
			var $query = "CREATE TABLE IF NOT EXISTS Assistant (id INT, name VARCHAR(255) NOT NULL);";

			con.query($query, function(err, rows) {
				if(err){
					console.log("An error ocurred performing the query.");
					console.log(err);
					return;
				}

				for (let i = 0; i < assistants.length; i++) {
					let name = assistants[i];
					$query = "SELECT * FROM Assistant WHERE name = ?";
					con.query($query, name, function(err, rows) {
						if(err){
							console.log("An error ocurred performing the query.");
							console.log(err);
							return;
						}
						if (rows.length === 0) {
							$query = "INSERT INTO Assistant (id, name) VALUES (?, ?)";
							con.query($query, [i, name], function(err, rows) {
								if(err){
									console.log("An error ocurred performing the query.");
									console.log(err);
									return;
								}
							});
						}
					});
				}
				
			});

			$query = "CREATE TABLE IF NOT EXISTS Teacher (id INT, name VARCHAR(255) NOT NULL);";

			con.query($query, function(err, rows) {
				if(err){
					console.log("An error ocurred performing the query.");
					console.log(err);
					return;
				}

				for (let i = 0; i < teachers.length; i++) {
					let name = teachers[i];
					$query = "SELECT * FROM Teacher WHERE name = ?";
					con.query($query, name, function(err, rows) {
						if(err){
							console.log("An error ocurred performing the query.");
							console.log(err);
							return;
						}
						if (rows.length === 0) {
							$query = "INSERT INTO Teacher (id, name) VALUES (?, ?)";
							con.query($query, [i, name], function(err, rows) {
								if(err){
									console.log("An error ocurred performing the query.");
									console.log(err);
									return;
								}
							});
						}
					});
				}
				
			});
			
		})
		.catch(function(err){
			console.log("error")
		});

		
  })
  .catch(function(err){
    console.log("error")
  });
