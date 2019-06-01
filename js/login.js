const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5588',
  database: 'CENG'
});

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

let login = document.getElementById('login');

login.addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let pass = document.getElementById('password').value;
    $query = 'SELECT * FROM User WHERE username = ?';
    con.query($query, email, function(err, rows) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }
        console.log("Query succesfully executed", rows);
        if (rows.length && pass == rows[0]['password']) {
            document.location.href = "../html/courseManagement.html";
        } else {
            alert("Wrong Credentials");
        }
    });
    
    
});