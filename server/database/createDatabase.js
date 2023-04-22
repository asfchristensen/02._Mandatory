import db from "./connection.js";
import bcrypt from "bcrypt";

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

if (isDeleteMode) {
    db.exec("DROP TABLE IF EXISTS users");
}

// DDL

db.exec(
    `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT,
        email TEXT
    )
    `
);

// DML

const adminPasswordPlainText = "admin";
const adminPasswordHashed = await bcrypt.hash(adminPasswordPlainText, 12);

const guestPasswordPlainText = "guest";
const guestPasswordHashed = await bcrypt.hash(guestPasswordPlainText, 12);

if (isDeleteMode) {
    db.run("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", ['admin', adminPasswordHashed, 'admin@mail.dk']);
    db.run("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", ['guest', guestPasswordHashed, 'guest@mail.dk']);
}