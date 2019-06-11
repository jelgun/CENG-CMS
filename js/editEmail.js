const mysql = require('mysql');
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
window.addEventListener('load', function() {
    var rawdata = fs.readFileSync('extra/data.json');  
    var data = JSON.parse(rawdata);
    if (data["isAdmin"]) {
        var element = document.getElementsByClassName('nav')[0]
        var str = '<a class="nav-link" id="v-pills-home-tab" data-toggle="pill" href="adminOperations.html" role="tab" aria-controls="v-pills-home" aria-selected="true">Admin Operations</a>'
        element.insertAdjacentHTML('beforeend', str);
    }
})
let btn = document.getElementById('button');
btn.addEventListener('click', () => {
    var newEmail = document.getElementById('email').value
    if (newEmail === "") {
        alert("Please fill in the blanks!")
    } else {
        var rawdata = fs.readFileSync('extra/data.json');  
        var data = JSON.parse(rawdata);
        var group = data["groupView"];
        var oldEmail = data["email"]
        var $query = "INSERT INTO Email (emailgroup, email) VALUES (?, ?)";
        con.query($query, [group, newEmail], function(err, rows) {
            if(err){
                console.log(err);
                return;
            }
        });
        $query = "DELETE FROM Email WHERE emailgroup = ? and email = ?;";
        con.query($query, [group, oldEmail], function(err, rows) {
            if(err){
                console.log(err);
                return;
            }
        });
        document.location.href = "../html/emailList.html";
    }
});
let back = document.getElementById('left-arrow');
back.addEventListener('click', () => {
    document.location.href = "../html/emailList.html";
});

let logout = document.getElementById('back');
logout.addEventListener('click', () => {
    var answer = confirm("Are you sure?")
    if (answer) {
        document.location.href = "../html/login.html";
    }
})