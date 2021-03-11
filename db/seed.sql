use emplyee_db;

-- Adding departments
insert into departments (name) values ("Finance");
insert into departments (name) values ("IT");
insert into departments (name) values ("HR");

-- Adding 'manager' roles
insert into roles (title, salary, department_id) values ("Finance Manager", 100000, 1);
insert into roles (title, salary, department_id) values ("IT Manager", 150000, 2);
insert into roles (title, salary, department_id) values ("HR Manager", 90000, 3);

-- Adding other roles
insert into roles (title, salary, department_id) values ("Finance Advisor", 75000, 1);
insert into roles (title, salary, department_id) values ("Engineer", 100000, 2);
insert into roles (title, salary, department_id) values ("HR Assistant", 80000, 3);


-- Adding employees
-- Finance departement:
insert into employees (f_name, l_name, role_id, manager_id) values ("Bobby", "Axelrod", 1, null);
insert into employees (f_name, l_name, role_id, manager_id) values ("Mike", "Wagner", 2, 1);

-- IT department:
insert into employees (f_name, l_name, role_id, manager_id) values ("Erlich", "Bachman", 3, null);
insert into employees (f_name, l_name, role_id, manager_id) values ("Jian", "Yang", 4, 3);

-- HR department:
insert into employees (f_name, l_name, role_id, manager_id) values ("Pam", "Poovey", 5, null);
insert into employees (f_name, l_name, role_id, manager_id) values ("Malory", "Archer", 6, 5);





