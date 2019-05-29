class ProfessionList {
    constructor(professions) {
        this.professions = professions;
    }
    getTeachers() {
        var list = [];
        for (let i = 0; i < this.professions.length; i++)
            if (this.professions[i].type == 0) 
                list.push(this.professions[i]);
        return list;
    }
    getAssistants() {
        var list = [];
        for (let i = 0; i < this.professions.length; i++)
            if (this.professions[i].type == 1) 
                list.push(this.professions[i]);
        return list;
    }
}

module.exports = ProfessionList;