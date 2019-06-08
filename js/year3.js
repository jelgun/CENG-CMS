var prev = -1;
var f = 0;

const mysql = require('mysql');
const fs = require('fs');

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
  $query = 'SELECT * FROM Course WHERE status = 1 and courseCode like ?';
  con.query($query, "CENG 3%", function(err, rows) {
      if(err){
          console.log("An error ocurred performing the query.");
          console.log(err);
          return;
      }
      var element = document.getElementsByClassName('courses')[0]
      for (let i = 0; i < rows.length; i++) {
        var course = rows[i]["courseCode"]
        var str = '<tr><td><div class="item">'+course+'</div></td></tr>'

        element.insertAdjacentHTML( 'afterbegin', str );
      }

      var $query = 'SELECT * FROM Schedule WHERE year=? and course like ?;';
      con.query($query, [3, "CENG 3%"], function(err, rows) {
          if(err){
              console.log(err);
              return;
          }
          for (let i = 0; i < rows.length; i++) {
            var cell = rows[i]["cell"]
            var course = rows[i]["course"]
            var cellr = parseInt(cell / 5, 10) + 1
            var cellc = cell % 5 + 1
            var element = document.getElementsByClassName('rc-'+cellr.toString()+'-'+cellc.toString())[0]
            var str = '<div class="assigned item">'+course+'</div>'

            element.insertAdjacentHTML( 'afterbegin', str );
          }

          $(function(){
            $('.item').draggable({
              revert:true,
              proxy:'clone'
            });
            $('.right td.drop').droppable({
              onDragEnter:function(){
                $(this).addClass('over');
                if (!f) {
                  prev = this.id;
                  f = 1;
                }
              },
              onDragLeave:function(){
                if (!f) {
                  prev = this.id;
                  f = 1;
                }
                $(this).removeClass('over');
              },
              onDrop:function(e,source){
                f = 0;
                $(this).removeClass('over');
                if ($(source).hasClass('assigned')){
                  $(this).append(source);
                } else {
                  prev = -1;
                  var c = $(source).clone().addClass('assigned');
                  $(this).append(c);
                  c.draggable({
                    revert:true
                  });
                }
                var courseCode = source.textContent
                var cell = this.id
                var $query = 'INSERT INTO Schedule (year, cell, course) VALUES (?, ?, ?);';
                con.query($query, [3, cell, courseCode], function(err, rows) {
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log("Query succesfully executed(ins)");
                });
                if (prev !== -1) {
                  var $query = 'DELETE FROM Schedule WHERE year=? and cell=?';
                  con.query($query, [3, prev], function(err, rows) {
                      if(err){
                          console.log(err);
                          return;
                      }
                      console.log("Query succesfully executed(del)");
                  });
                }
              }
            });
            $('.trsh').droppable({
              accept:'.assigned',
              onDragEnter:function(e,source){
                $(source).addClass('trash');
              },
              onDragLeave:function(e,source){
                $(source).removeClass('trash');
              },
              onDrop:function(e,source){
                var $query = 'DELETE FROM Schedule WHERE year=? and cell=?';
                con.query($query, [3, prev], function(err, rows) {
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log("Query succesfully executed(del)");
                });
                $(source).remove();
                
                f = 0;
              }
            });
          });
      });

      
  });
})


let logout = document.getElementById('back');
logout.addEventListener('click', () => {
    var answer = confirm("Are you sure?")
    if (answer) {
        document.location.href = "../html/login.html";
    }
})