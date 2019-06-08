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
    let rawdata = fs.readFileSync('extra/data.json');  
    let data = JSON.parse(rawdata);
    var group = data["groupView"];
    if (data["isAdmin"]) {
        var element = document.getElementsByClassName('nav')[0]
        var str = '<a class="nav-link" id="v-pills-home-tab" data-toggle="pill" href="adminOperations.html" role="tab" aria-controls="v-pills-home" aria-selected="true">Admin Operations</a>'
        element.insertAdjacentHTML('beforeend', str);
    }
    $query = 'SELECT email FROM Email WHERE emailgroup = ?;';
    con.query($query, group, function(err, rows) {
        if(err){
            console.log(err);
            return;
        }
        var element = document.getElementsByClassName('list-group')[0]
        for (let i = 0; i < rows.length; i++) {
            var email = rows[i]["email"]
            var str = '<li class="list-group-item mydivouter">'+email+'<input type="button" id="btn-modify" class="mybuttonoverlap btn btn-info" value="Edit"/><input type="button" id="btn-modify" class="mybuttonoverlap btn btn-info" value="Delete"/> </li>'
            element.insertAdjacentHTML('beforeend', str);
        }
    })
})
let back = document.getElementById('left-arrow');
back.addEventListener('click', () => {
    document.location.href = "../html/notificationManagement.html";
});

let logout = document.getElementById('back');
logout.addEventListener('click', () => {
    var answer = confirm("Are you sure?")
    if (answer) {
        document.location.href = "../html/login.html";
    }
})