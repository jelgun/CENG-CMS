class EmailList {
    constructor(category, emails) {
        this.category = category;
        this.emails = emails;
    }
    addEmail(email) {
        this.emails.push(email);
    }
    deleteEmail(email) {
        var idx;
        for (let i = 0; i < this.emails.length; i++) 
            if (this.emails[i] == email) {
                idx = i;
                break;
            }
        this.emails.splice(idx, 1);
    }
    editEmail(email) {
        var idx;
        for (let i = 0; i < this.emails.length; i++) 
            if (this.emails[i] == email) {
                idx = i;
                break;
            }
        this.emails[idx] = email;
    }
    getEmails() {
        return this.emails;
    }
    getCategory() {
        return this.category;
    }
}

module.exports = EmailList;