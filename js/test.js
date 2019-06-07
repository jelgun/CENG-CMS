const mysql = require('mysql');

// First you need to create a connection to the db
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5588',
  database: 'CENG'
});


const rp = require('request-promise');
var url = 'http://ceng.iyte.edu.tr/people/#1509273723231-a94f5ba0-b99e';
const $ = require('cheerio');


rp(url)
  .then(function(html){

	var teachers = [];
    $('div[id=1509273723231-a94f5ba0-b99e] .stm-teacher__name', html).find('a').each(function (index, element) {
      teachers.push($(element).text());
    });
	
	url = 'http://ceng.iyte.edu.tr/people/#1509273723275-e66d8fee-ba28';
	

	rp(url)
		.then(function(html){
		//success!
			var assistants = [];
			$('div[id=1509273723275-e66d8fee-ba28] .stm-teacher__name', html).find('a').each(function (index, element) {
				assistants.push($(element).text());
			});
			
			var $query = "CREATE TABLE IF NOT EXISTS Assistant (id INT, name VARCHAR(255) NOT NULL);";

			con.query($query, function(err, rows) {
				if(err){
					console.log(err);
					return;
				}

				for (let i = 0; i < assistants.length; i++) {
					let name = assistants[i];
					$query = "SELECT * FROM Assistant WHERE name = ?";
					con.query($query, name, function(err, rows) {
						if(err){
							console.log(err);
							return;
						}
						if (rows.length === 0) {
							$query = "INSERT INTO Assistant (id, name) VALUES (?, ?)";
							con.query($query, [i, name], function(err, rows) {
								if(err){
									console.log(err);
									return;
								}
							});
						}
					});
				}
				
			});

			$query = "CREATE TABLE IF NOT EXISTS Teacher (id INT, name VARCHAR(255) NOT NULL);";

			con.query($query, function(err, rows) {
				if(err){
					console.log(err);
					return;
				}

				for (let i = 0; i < teachers.length; i++) {
					let name = teachers[i];
					$query = "SELECT * FROM Teacher WHERE name = ?";
					con.query($query, name, function(err, rows) {
						if(err){
							console.log(err);
							return;
						}
						if (rows.length === 0) {
							$query = "INSERT INTO Teacher (id, name) VALUES (?, ?)";
							con.query($query, [i, name], function(err, rows) {
								if(err){
									console.log(err);
									return;
								}
							});
						}
					});
				}
				
			});
			
		})
		.catch(function(err){
			console.log("error1")
		});


	url = 'http://ceng.iyte.edu.tr/education/undergraduate-program/courses/';
	rp(url)
		.then(function(html){
			var rows = $(".stm-table", html).find("tr");
			courses = []
			for (let i = 0; i < rows.length; i++) {
				var current = rows[i];
				var cols = $(current).children().find("td a")
				var text = $(current).children().find("td p").text()
				var ch = 0;
				var link = "";
				if (cols.length !== 0) {
					details = []
					$(cols).each(function (index, element) {
						details.push($(element).text());
						if (ch === 0) {
							ch = 1;
							link = $(element).attr('href');
						}
					});
					var courseCode = details[0];
					var courseName = details[1];
					var courseInfo = text;
					var prerequisite = "";
					if (details.length === 3) {
						prerequisite = details[2];
					}
					courses.push([courseCode, courseName, 0, courseInfo, prerequisite])

					var url = link;
					rp(url)
						.then(function(html){
							var people = []
							$(".stm-teacher-bio__title > a", html).each(function (index, element) {
								people.push($(element).text());
							});
							var courseCode = $(".course-code", html).text();
							courseCode = courseCode.trim();
							var $query = "CREATE TABLE IF NOT EXISTS CourseTeacher (courseCode VARCHAR(255) NOT NULL, teacherId INT);";
							con.query($query, function(err, rows) {
								if(err){
									console.log("err1");
									return;
								}
								var $query = "SELECT * FROM Teacher;";
								con.query($query, function(err, rows) {
									if(err){
										console.log("err2");
										return;
									}
									var teacherIds = [];
									for (let i = 0; i < rows.length; i++) {
										if (people.includes(rows[i]["name"])) {
											teacherIds.push(rows[i]["id"]);
										}
									}
									for (let i = 0; i < teacherIds.length; i++) {
										var $query = "SELECT * FROM CourseTeacher WHERE courseCode = ? and teacherId = ?;";
										con.query($query, [courseCode, teacherIds[i]], function(err, rows) {
											if(err){
												console.log("err3");
												return;
											}
											if (rows.length === 0) {
												var $query = "INSERT INTO CourseTeacher (courseCode, teacherId) VALUES (?, ?)";
												con.query($query, [courseCode, teacherIds[i]], function(err, rows) {
													if(err){
														console.log("err4");
														return;
													}
													
												});
											}
										});
										
									}
								});
								
							});

							var $query = "CREATE TABLE IF NOT EXISTS CourseAssistant (courseCode VARCHAR(255) NOT NULL, assistantId INT);";
							con.query($query, function(err, rows) {
								if(err){
									console.log("err1");
									return;
								}
								var $query = "SELECT * FROM Assistant;";
								con.query($query, function(err, rows) {
									if(err){
										console.log("err2");
										return;
									}
									var assIds = [];
									for (let i = 0; i < rows.length; i++) {
										if (people.includes(rows[i]["name"])) {
											assIds.push(rows[i]["id"]);
										}
									}
									for (let i = 0; i < assIds.length; i++) {
										var $query = "SELECT * FROM CourseAssistant WHERE courseCode = ? and assistantId = ?;";
										con.query($query, [courseCode, assIds[i]], function(err, rows) {
											if(err){
												console.log("err3");
												return;
											}
											if (rows.length === 0) {
												var $query = "INSERT INTO CourseAssistant (courseCode, assistantId) VALUES (?, ?)";
												con.query($query, [courseCode, assIds[i]], function(err, rows) {
													if(err){
														console.log("err4");
														return;
													}
													
												});
											}
										});
										
									}
								});
								
							});
						})
						.catch(function(err){
							console.log("error6")
						});
				}

			}
			//console.log(courses)
			url = 'http://ceng.iyte.edu.tr/weekly-course-schedules/#first-year';

			rp(url)
				.then(function(html){
					var activeCourses = []
					$("strong > a", html).each(function (index, element) {
						var courseCode = $(element).text();
						courseCode = courseCode.slice(0, 8);
						activeCourses.push(courseCode);
					});
					for (let i = 0; i < courses.length; i++) {
						if (activeCourses.includes(courses[i][0])) {
							courses[i][2] = 1;
						}
					}
					//console.log(courses)
					var $query = "CREATE TABLE IF NOT EXISTS Course (courseCode VARCHAR(255) NOT NULL, courseName VARCHAR(255) NOT NULL,prerequisite VARCHAR(255) NOT NULL, courseInfo VARCHAR(5000) NOT NULL,status INT);"
					con.query($query, function(err, rows) {
						if(err){
							console.log("err3create");
							return;
						}
						for (let i = 0; i < courses.length; i++) {
							var $query = "SELECT * FROM Course WHERE courseCode = ? and courseName = ? and prerequisite = ? and courseInfo = ? and status = ?;";
							
							con.query($query, [courses[i][0], courses[i][1], courses[i][4], courses[i][3], courses[i][2]], function(err, rows) {
								if(err){
									console.log("err3check");
									return;
								}
								if (rows.length === 0) {
									var $query = "INSERT INTO Course (courseCode, courseName, prerequisite, courseInfo, status) VALUES (?, ?, ?, ?, ?)";
									con.query($query, [courses[i][0], courses[i][1], courses[i][4], courses[i][3], courses[i][2]], function(err, rows) {
										if(err){
											console.log(err);
											return;
										}
										
									});
								}
							});
							
						}
					});
				})
				.catch(function(err){
					console.log("error5")
				});
			
		})
		.catch(function(err){
			console.log("error4")
		});
		
  })
  .catch(function(err){
    console.log("error3")
  });
