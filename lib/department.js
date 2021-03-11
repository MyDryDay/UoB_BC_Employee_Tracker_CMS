class Departments{
    constructor(name){
        this.name = name;
    }
    returnName(){
        return this.name;
    }
    returnTable(){
        return "departments";
    }
}

module.exports = Departments;