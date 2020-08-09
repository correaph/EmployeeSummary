//Intern class. Sub-class of Employee class.
const Employee = require("./Employee.js");
class Intern extends Employee {
    constructor(name, email, id, school) {
        super(name, email, id);
        this.school = school;
    }
    getRole() {
        return "Intern";
    }
    getSchool() {
        return this.school;
    }
}
module.exports = Intern;