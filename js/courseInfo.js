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
var courseCode = ""
window.addEventListener('load', function() {
    let rawdata = fs.readFileSync('extra/data.json');  
    let data = JSON.parse(rawdata);
    courseCode = data["courseView"];
    if (data["isAdmin"]) {
        var element = document.getElementsByClassName('nav')[0]
        var str = '<a class="nav-link" id="v-pills-home-tab" data-toggle="pill" href="adminOperations.html" role="tab" aria-controls="v-pills-home" aria-selected="true">Admin Operations</a>'
        element.insertAdjacentHTML('beforeend', str);
    }
    $query = 'SELECT * FROM Course WHERE courseCode = ?;';
    con.query($query, courseCode, function(err, rows) {
        if(err){
            console.log(err);
            return;
        }
        $query = 'SELECT teacherId FROM CourseTeacher WHERE courseCode = ?;';
        con.query($query, courseCode, function(err, rows) {
            if(err){
                console.log(err);
                return;
            }
            
            for (let i = 0; i < rows.length; i++) { 
                id = rows[i]["teacherId"]
                $query = 'SELECT name FROM Teacher WHERE id = ?;';
                
                con.query($query, id, function(err, rows) {
                    if(err){
                        console.log(err);
                        return;
                    }
                    var element = document.getElementsByClassName('courseInstructors')[0]
                    var str = '<li>'+rows[0]["name"]+'</li>' 
                    element.insertAdjacentHTML('beforeend', str);
                })
            }
        })
        $query = 'SELECT assistantId FROM CourseAssistant WHERE courseCode = ?;';
        con.query($query, courseCode, function(err, rows) {
            if(err){
                console.log(err);
                return;
            }
            
            for (let i = 0; i < rows.length; i++) { 
                id = rows[i]["assistantId"]
                $query = 'SELECT name FROM Assistant WHERE id = ?;';
                
                con.query($query, id, function(err, rows) {
                    if(err){
                        console.log(err);
                        return;
                    }
                    var element = document.getElementsByClassName('courseAssistants')[0]
                    var str = '<li>'+rows[0]["name"]+'</li>' 
                    element.insertAdjacentHTML('beforeend', str);
                })
            }
        })
        var element = document.getElementsByClassName('courseCode')[0]
        var str = '<h3>'+courseCode+'</h3>'
        element.insertAdjacentHTML('beforeend', str);
        element = document.getElementsByClassName('courseName')[0]
        str = '<h4>'+rows[0]["courseName"]+'</h4>'
        element.insertAdjacentHTML('beforeend', str);
        element = document.getElementsByClassName('coursePrerequisite')[0]
        pre = rows[0]["prerequisite"] ? rows[0]["prerequisite"] : 'Null'
        str = '<h4>'+'Prerequisite: '+pre+'</h4>'
        element.insertAdjacentHTML('beforeend', str);
        element = document.getElementsByClassName('courseStatus')[0]
        status = rows[0]["status"] ? 'Active' : 'Passive'
        str = '<h4>'+'Status: '+ status +'</h4>'
        element.insertAdjacentHTML('beforeend', str);
        element = document.getElementsByClassName('courseInfo')[0]
        str = '<h4>'+'Description: </h4><p>'+rows[0]["courseInfo"]+'</p>'
        element.insertAdjacentHTML('beforeend', str);
      })
  })

let back = document.getElementById('left-arrow');
back.addEventListener('click', () => {
    document.location.href = "../html/courseManagement.html";
});

let logout = document.getElementById('back');
logout.addEventListener('click', () => {
    var answer = confirm("Are you sure?")
    if (answer) {
        document.location.href = "../html/login.html";
    }
})

let edit = document.getElementById('delete');
edit.addEventListener('click', () => {
    var answer = confirm("Are you sure?")
    if (answer) {
        var $query = 'DELETE FROM Course WHERE courseCode = ?'
        con.query($query, courseCode, function(err, rows) {
            if(err){
                console.log(err);
                return;
            }
        })
        var $query = 'DELETE FROM CourseTeacher WHERE courseCode = ?'
        con.query($query, courseCode, function(err, rows) {
            if(err){
                console.log(err);
                return;
            }
        })
        var $query = 'DELETE FROM CourseAssistant WHERE courseCode = ?'
        con.query($query, courseCode, function(err, rows) {
            if(err){
                console.log(err);
                return;
            }
        })
        document.location.href = "../html/courseManagement.html";
    }
})

