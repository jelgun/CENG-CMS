class Cell {
    constructor(course, year, day, hour) {
        this.course = course;
        this.year = year;
        this.day = day;
        this.hour = hour;
    }
    setCourse(course) {
        this.course = course;
    }
    setYear(year) {
        this.year = year;
    }
    setDay(day) {
        this.day = day;
    }
    setHour(hour) {
        this.hour = hour;
    }
    getCourse() {
        return this.course;
    }
    getYear() {
        return this.year;
    }
    getDay() {
        return this.day;
    }
    getHour() {
        return this.hour;
    }
}

module.exports = Cell;