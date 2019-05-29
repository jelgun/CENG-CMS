class Profession {
    constructor(id, name, type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }
    setId(id) {
        this.id = id;
    }
    setName(name) {
        this.name = name;
    }
    setType(type) {
        this.type = type;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getType() {
        return this.type;
    }
}

module.exports = Profession;