const mysql = require('mysql');
const bcrypt = require('bcryptjs');

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
    console.log('click')
    con.query($query, email, function(err, rows) {
        if(err){
            console.log(err);
            return;
        }
        if (rows.length && bcrypt.compareSync(pass, rows[0]["password"])) {
          document.location.href = "../html/courseManagement.html";
        } else {
          alert("Wrong Credentials");
        }
    });
    
    
});