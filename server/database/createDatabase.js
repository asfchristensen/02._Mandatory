import dotenv from "dotenv/config";
import db from "./connection.js";
import bcrypt from "bcrypt";

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;
console.log(isDeleteMode);

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

// DML - seeding data into the database

const adminPasswordPlainText = process.env.ADMIN_PASSWORD;
const adminPasswordHashed = await bcrypt.hash(adminPasswordPlainText, 12);

const guestPasswordPlainText = process.env.GUEST_PASSWORD;
const guestPasswordHashed = await bcrypt.hash(guestPasswordPlainText, 12);

if (isDeleteMode) {
    db.run("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", ['admin', adminPasswordHashed, 'admin@mail.dk']);
    db.run("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", ['guest', guestPasswordHashed, 'guest@mail.dk']);
}