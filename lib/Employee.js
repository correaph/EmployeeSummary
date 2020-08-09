//Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getRole() {
        return "Employee";
    }
}
module.exports = Employee;
