class Course {
    constructor(courseCode, courseName, prerequisite, teacher, assistants, courseInfo, status) {
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.prerequisite = prerequisite;
        this.teacher = teacher;
        this.assistants = assistants;
        this.courseInfo = courseInfo;
        this.status = status;
    }
    setCourseCode(courseCode) {
        this.courseCode = courseCode;
    }
    setCourseName(courseName) {
        this.courseName = courseName;
    }
    setPrerequisite(prerequisite) {
        this.prerequisite = prerequisite;
    }
    setTeacher(teacher) {
        this.teacher = teacher;
    } 
    setAssistants(assistants) {
        this.assistants = assistants;
    }
    setCourseInfo(courseInfo) {
        this.courseInfo = courseInfo;
    }
    setStatus(status) {
        this.status = status;
    }
    getCourseCode() {
        return this.courseCode;
    }
    getCourseName() {
        return this.courseName;
    }
    getPrerequisite() {
        return this.prerequisite;
    }
    getTeacher() {
        return this.teacher;
    }
    getAssistants() {
        return this.assistants;
    }
    getCourseInfo() {
        return this.courseInfo;
    }
    getStatus() {
        return this.status;
    }
}

module.exports = Course;