import dotenv from "dotenv/config";
import db from "./connection.js";
import bcrypt from "bcrypt";

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;
console.log(isDeleteMode);

if (isDeleteMode) {
    db.exec("DROP TABLE IF EXISTS users");
    db.exec("DROP TABLE IF EXISTS roles");
}

// DDL

db.exec(
    `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT,
        email TEXT,
        role_id INTEGER,
        FOREIGN KEY (role_id) REFERENCES roles (id)
    )
    `
);

db.exec(
    `
    CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        role TEXT
    )
    `
);

// DML - seeding data into the database

const adminPasswordPlainText = process.env.ADMIN_PASSWORD;
const adminPasswordHashed = await bcrypt.hash(adminPasswordPlainText, 12);

const employeePasswordPlainText = process.env.EMPLOYEE_PASSWORD;
const employeePasswordHashed = await bcrypt.hash(employeePasswordPlainText, 12);

if (isDeleteMode) {
    // roles db
    db.run("INSERT INTO roles (role) VALUES (?)", ['admin']);
    db.run("INSERT INTO roles (role) VALUES (?)", ['employee']);
    db.run("INSERT INTO roles (role) VALUES (?)", ['guest']);

    // users db
    db.run("INSERT INTO users (username, password, email, role_id) VALUES (?, ?, ?, ?)", ['admin', adminPasswordHashed, 'admin@mail.dk', 1]);
    db.run("INSERT INTO users (username, password, email, role_id) VALUES (?, ?, ?, ?)", ['employee', employeePasswordHashed, 'employee@mail.dk', 2]);
    db.run("INSERT INTO users (username, password, email, role_id) VALUES (?, ?, ?, ?)", ['employee1', employeePasswordHashed, 'employee1@mail.dk', 2]);
    db.run("INSERT INTO users (username, password, email, role_id) VALUES (?, ?, ?, ?)", ['employee2', employeePasswordHashed, 'employee2@mail.dk', 2]);
    db.run("INSERT INTO users (username, password, email, role_id) VALUES (?, ?, ?, ?)", ['employee3', employeePasswordHashed, 'employee3@mail.dk', 2]);
    db.run("INSERT INTO users (username, password, email, role_id) VALUES (?, ?, ?, ?)", ['employee4', employeePasswordHashed, 'employee4@mail.dk', 2]);
}