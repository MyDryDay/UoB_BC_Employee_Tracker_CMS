drop database if exists employee_db;

create database employee_db;

use employee_db;

create table departments(
    id integer not null auto_increment primary key,
    name varchar(30)
);

create table roles(
    id integer not null auto_increment primary key,
    title varchar(30),
    salary decimal,
    department_id integer,
    foreign key (department_id) references departments(id)
);

create table employees(
    id integer not null auto_increment primary key,
    f_name varchar(30),
    l_name varchar(30),
    role_id integer,
    manager_id integer,
    foreign key (role_id) references roles(id),
    foreign key (manager_id) references roles(id)
);