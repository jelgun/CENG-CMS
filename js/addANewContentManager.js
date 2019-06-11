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

var add = document.getElementsByClassName('add')[0]
add.addEventListener('click', () => {
    var email = document.getElementById('email').value
    var pass = document.getElementById('password').value
    if (email === "" || pass === "") {
        alert("Please fill in the information!")
    } else {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(pass, salt);
        var $query = 'INSERT INTO User(username, password, isAdmin) VALUES(?, ?, ?);';
        con.query($query, [email, hash, 0], function(err, rows) {
            if(err){
                console.log(err);
                return;
            }
            
        });
        document.location.href = "../html/adminOperations.html";
    }
})

let back = document.getElementById('left-arrow');
back.addEventListener('click', () => {
    document.location.href = "../html/adminOperations.html";
});

let logout = document.getElementById('back');
logout.addEventListener('click', () => {
    var answer = confirm("Are you sure?")
    if (answer) {
        document.location.href = "../html/login.html";
    }
})