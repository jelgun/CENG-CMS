class Schedule {
    constructor(cells) {
        this.cells = cells;
    }
    addCourseToCell(course, year, day, hour) {
        for (let i = 0; i < this.cells.length; i++)
            if (this.cells[i].getYear() == year
                && this.cells[i].getDay() == day
                && this.cells[i].getHour() == hour) {
                    this.cells[i].setCourse(course);
                    break;
                }
    }
    emptyCell(year, day, hour) {
        for (let i = 0; i < this.cells.length; i++)
            if (this.cells[i].getYear() == year
                && this.cells[i].getDay() == day
                && this.cells[i].getHour() == hour) {
                    this.cells[i].setCourse(null);
                    break;
                }
    }
    getSchedule() {
        return this.cells;
    }
}

module.exports = Schedule;