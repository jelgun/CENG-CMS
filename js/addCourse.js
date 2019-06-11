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
var teacherobj = {}
var assistantobj = {}
window.addEventListener('load', function() {
    let rawdata = fs.readFileSync('extra/data.json');  
    let data = JSON.parse(rawdata);
    if (data["isAdmin"]) {
        var element = document.getElementsByClassName('nav')[0]
        var str = '<a class="nav-link" id="v-pills-home-tab" data-toggle="pill" href="adminOperations.html" role="tab" aria-controls="v-pills-home" aria-selected="true">Admin Operations</a>'
        element.insertAdjacentHTML('beforeend', str);
    }
    var $query = 'SELECT * FROM Teacher'
    con.query($query, function(err, rows) {
        if(err){
            console.log(err);
            return;
        }
        var element = document.getElementById('teachers')
        for (let i = 0; i < rows.length; i++) {
            var str = '<option value="'+rows[i]["name"]+'">'+rows[i]["name"]+'</option>'
            element.insertAdjacentHTML('beforeend', str);
            teacherobj[rows[i]["name"]] = rows[i]["id"]
        }
    })
    var $query = 'SELECT courseCode FROM Course'
    con.query($query, function(err, rows) {
        if(err){
            console.log(err);
            return;
        }
        var element = document.getElementById('prerequisite')
        for (let i = 0; i < rows.length; i++) {
            var str = '<option value="'+rows[i]["courseCode"]+'">'+rows[i]["courseCode"]+'</option>'
            element.insertAdjacentHTML('beforeend', str);
        }
    })
    var $query = 'SELECT * FROM Assistant'
    con.query($query, function(err, rows) {
        if(err){
            console.log(err);
            return;
        }
        var element = document.getElementById('assistants')
        for (let i = 0; i < rows.length; i++) {
            var str = '<option value="'+rows[i]["name"]+'">'+rows[i]["name"]+'</option>'
            element.insertAdjacentHTML('beforeend', str);
            assistantobj[rows[i]["name"]] = rows[i]["id"]
        }
    })
})

function getSelectedOptions(sel) {
    var opts = [], opt;
    
    // loop through options in select list
    for (var i=0, len=sel.options.length; i<len; i++) {
        opt = sel.options[i];
        
        // check if selected
        if ( opt.selected ) {
            // add to array of option elements to return from this function
            opts.push(opt.value);
            
        }
    }
    
    // return array containing references to selected option elements
    return opts;
}
var teachers = []
var assistants = []
var prerequisite = ""

document.getElementById('teachers').onchange = function(e) {
    teachers = getSelectedOptions(this)
};
document.getElementById('prerequisite').onchange = function(e) {
    prerequisite = getSelectedOptions(this)
};
document.getElementById('assistants').onchange = function(e) {
    assistants = getSelectedOptions(this)
};

var save = document.getElementById('saveButton');
save.addEventListener('click', () => {
    var courseCode = document.getElementById('courseCode').value
    var courseName = document.getElementById('courseName').value
    var courseInfo = document.getElementById('courseInfo').value
    var status = document.querySelector('.checkbox').checked;
    if (courseCode === ""
        || courseName === ""
        || courseInfo === ""
        || teachers.length === 0
        || assistants.length === 0) {
        alert('Please fill in the corresponding fields!')
    } else {
        var $query = "INSERT INTO Course (courseCode, courseName, prerequisite, courseInfo, status) VALUES (?, ?, ?, ?, ?)";
        if (status) {
            status = 1
        } else {
            status = 0
        }
        con.query($query,[courseCode, courseName, prerequisite, courseInfo, status], function(err, rows) {
            if(err){
                console.log(err);
                return;
            }
        })
        
        for (let i = 0; i < teachers.length; i++) {
            id = teacherobj[teachers[i]]
            var $query = "INSERT INTO CourseTeacher (courseCode, teacherId) VALUES (?, ?)";
            con.query($query, [courseCode, id], function(err, rows) {
                if(err){
                    console.log(err);
                    return;
                }
            });
        }

        for (let i = 0; i < assistants.length; i++) {
            id = assistantobj[assistants[i]]
            var $query = "INSERT INTO CourseAssistant (courseCode, assistantId) VALUES (?, ?)";
            con.query($query, [courseCode, id], function(err, rows) {
                if(err){
                    console.log(err);
                    return;
                }
            });
        }
    }
    document.location.href = "../html/courseManagement.html";
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