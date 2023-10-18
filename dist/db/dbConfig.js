"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataBase = void 0;
const sqlite3 = require("sqlite3").verbose();
const filePath = "./db/dbUser.db";
const createDataBase = () => {
    let db = new sqlite3.Database(filePath, (error) => {
        if (error) {
            return console.error(error.message);
        }
    });
    console.log("Connection with SQLite has been estabilished");
    db.exec(`CREATE TABLE IF NOT EXISTS user(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        birthday VARCHAR(50),
        address VARCHAR(50)
       
       
        );
        `);
    return db;
};
exports.createDataBase = createDataBase;
// import { Database, sqlite3 } from "sqlite3";
// const sqlite3 = require("sqlite3").verbose();
// const filePath: string = "db\dbUser.db"
// const createDataBase = () => {
//     let db: Database = new sqlite3.Database( (error: Error) => {
//         if (error) {
//             return console.error(error.message);
//         }
//     });
// }
//     console.log("Connection with SQLite has been estabilished");
//     db.exec(`CREATE TABLE IF NOT EXISTS user (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name VARCHAR(50),
//         birthday VARCHAR(50),
//         address VARCHAR(50)
//         );
//     `);
//     return db;
//   export { createDataBase}
