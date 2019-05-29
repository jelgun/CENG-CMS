class Event {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
    setId(id) {
        this.id = id;
    }
    setTitle(title) {
        this.title = title;
    }
    setDescription(description) {
        this.description = description;
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
}

module.exports = Event;