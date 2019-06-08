const mysql = require('mysql');
const bcrypt = require('bcryptjs');
var fs = require('fs');

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
            console.log(err);
            return;
        }
        if (rows.length && bcrypt.compareSync(pass, rows[0]["password"])) {
          let rawdata = fs.readFileSync('extra/data.json');  
          let data = JSON.parse(rawdata);
          data["isAdmin"] = rows[0]["isAdmin"];
          var jsonContent = JSON.stringify(data);
          fs.writeFileSync('extra/data.json', jsonContent); 
          document.location.href = "../html/courseManagement.html";
        } else {
          alert("Wrong Credentials");
        }
    });
    
    
});