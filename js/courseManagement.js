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
  $query = 'SELECT courseCode, courseName FROM Course';
  con.query($query,function(err, rows) {
      if(err){
          console.log(err);
          return;
      }
      var element = document.getElementsByClassName('courses')[0]
      for (let i = 0; i < rows.length; i++) {
        var course = rows[i]["courseCode"] + ' ' + rows[i]["courseName"]
        var str = '<li class="list-group-item mydivouter">'+course+'<input id="'+rows[i]["courseCode"]+'" type="button" class="mybuttonoverlap btn btn-info btn-view" value="View"/> </li>'

        element.insertAdjacentHTML('beforeend', str);
      }

      var view_btn = document.getElementsByClassName('btn-view')
      for (let i = 0; i < view_btn.length; i++) {
        view_btn[i].addEventListener('click', (e) => {
          var course = e.target.id
          
          var request = new XMLHttpRequest();
          request.open("GET","../extra/data.json", false);
          request.send(null);
          var jsonData = JSON.parse(request.responseText);
          jsonData["courseView"] = course
          var jsonContent = JSON.stringify(jsonData);
          fs.writeFileSync('extra/data.json', jsonContent); 
          document.location.href = "../html/courseInfo.html";
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