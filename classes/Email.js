class Email {
    constructor(category, email) {
        this.category = category;
        this.email = email;
    } 
    setCategory(category) {
        this.category = category;
    } 
    setEmail(email) {
        this.email = email;
    }
    getCategory() {
        return this.category;
    }
    getEmail() {
        return this.email;
    }
}

module.exports = Email;