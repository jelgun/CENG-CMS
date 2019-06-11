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
    if (data["isAdmin"]) {
        var element = document.getElementsByClassName('nav')[0]
        var str = '<a class="nav-link" id="v-pills-home-tab" data-toggle="pill" href="adminOperations.html" role="tab" aria-controls="v-pills-home" aria-selected="true">Admin Operations</a>'
        element.insertAdjacentHTML('beforeend', str);
    }
    $query = 'SELECT DISTINCT emailgroup FROM Email';
    con.query($query,function(err, rows) {
        if(err){
            console.log(err);
            return;
        }
        var element = document.getElementsByClassName('list-group')[0]
        for (let i = 0; i < rows.length; i++) {
            var group = rows[i]["emailgroup"] + ' Email List'
            var str = '<li class="list-group-item mydivouter">'+group+'<input id="'+rows[i]["emailgroup"]+'" type="button" class="mybuttonoverlap btn btn-info btn-view" value="Show"/> </li>'
            element.insertAdjacentHTML('beforeend', str);
        }
        var view_btn = document.getElementsByClassName('btn-view')
        for (let i = 0; i < view_btn.length; i++) {
            view_btn[i].addEventListener('click', (e) => {
                var group = e.target.id
                
                var request = new XMLHttpRequest();
                request.open("GET","../extra/data.json", false);
                request.send(null);
                var jsonData = JSON.parse(request.responseText);
                jsonData["groupView"] = group
                var jsonContent = JSON.stringify(jsonData);
                fs.writeFileSync('extra/data.json', jsonContent); 
                document.location.href = "../html/emailList.html";
            })
        }
    })
})
let logout = document.getElementById('back');
logout.addEventListener('click', () => {
    var answer = confirm("Are you sure?")
    if (answer) {
        document.location.href = "../html/login.html";
    }
})

document.getElementById('fileInput').onchange = function () {
    var rawdata = fs.readFileSync(this.files[0].path);  
    var data = JSON.parse(rawdata);
    for (let i = 0; i < data["emails"].length; i++) {
        var $query = 'INSERT INTO Email(emailgroup, email) VALUES(?, ?);'
        con.query($query, [data["name"], data["emails"][i]], function(err, rows) {
            if(err){
                console.log(err);
                return;
            }
        })
    }
    location.reload();
};