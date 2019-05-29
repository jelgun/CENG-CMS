class CourseList {
    constructor(courses) {
        this.courses = courses;
    }
    addCourse(course) {
        this.coures.push(course);
    }
    deleteCourse(courseCode) {
        var idx;
        for (let i = 0; i < this.courses.length; i++) 
            if (this.courses[i].getCourseCode() == courseCode) {
                idx = i;
                break;
            }
        this.courses.splice(idx, 1);
    }
    editCourse(course) {
        var idx;
        for (let i = 0; i < this.courses.length; i++) 
            if (this.courses[i].getCourseCode() == courseCode) {
                idx = i;
                break;
            }
        this.courses[idx] = course;
    }
    getCourse(courseCode) {
        for (let i = 0; i < this.courses.length; i++) 
            if (this.courses[i].getCourseCode() == courseCode) {
                return this.courses[i];
            }
    }
}

module.exports = CourseList;