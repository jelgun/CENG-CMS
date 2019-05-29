class EmailGroups {
    constructor(emailLists) {
        this.groups = emailLists;
    }
    importEmailList() {

    }
    getEmailList(category) {
        for (let i = 0; i < this.groups.length; i++) 
            if (this.groups[i].getCategory() == category){
                return this.groups[i].getEmails();
            }
    }
}

module.exports = EmailGroups;