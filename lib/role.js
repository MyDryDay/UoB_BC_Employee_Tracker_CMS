class Roles{
    constructor(title, salary, department_id){
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }
    returnTitle(){
        return this.title;
    }
    returnSalary(){
        return this.salary;
    }
    returnDepartmentId(){
        return this.department_id;
    }
    returnTable(){
        return "roles";
    }
}

module.exports = Roles;