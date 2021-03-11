class Employees{
    constructor(f_name, l_name, role_id, manager_id){
        this.f_name = f_name;
        this.l_name = l_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }
    returnFirstName(){
        return this.f_name;
    }
    returnLastName(){
        return this.l_name;
    }
    returnRoleId(){
        return this.role_id;
    }
    returnManagerId(){
        return this.manager_id;
    }
    returnTable(){
        return "employees";
    }
}

module.exports = Employees;