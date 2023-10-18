"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserByQuery = exports.updateUserBySpecificField = exports.updateUser = exports.addUser = exports.userDetailsByParams = exports.userDetailsByQuery = exports.userList = exports.userRoot = void 0;
const dbConfig_1 = require("../db/dbConfig");
const logger_1 = __importDefault(require("../services/logger"));
let db = (0, dbConfig_1.createDataBase)();
const userRoot = (req, res, next) => {
    res.send("User's Home Page");
};
exports.userRoot = userRoot;
const userList = (req, res) => {
    let userList = [];
    let sql = `SELECT * FROM user`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            logger_1.default.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row) => { userList.push(row); });
        logger_1.default.info(req);
        res.send(userList);
    });
};
exports.userList = userList;
const userDetailsByQuery = (req, res) => {
    logger_1.default.info(req);
    let id = req.query.id;
    let sql = `SELECT * FROM user WHERE id="${id}"`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            res.send(error.message);
        }
        if (rows.length > 0) {
            res.send(rows[0]);
        }
        else {
            res.send("User not found.");
        }
    });
};
exports.userDetailsByQuery = userDetailsByQuery;
const userDetailsByParams = (req, res) => {
    logger_1.default.info(req);
    let name = req.params.name;
    let sql = `SELECT * FROM user WHERE name="${name}"`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            res.send(error.message);
        }
        if (rows.length > 0) {
            res.send(rows[0]);
        }
        else {
            res.send("User not found.");
        }
    });
};
exports.userDetailsByParams = userDetailsByParams;
const addUser = (req, res) => {
    let user = req.body;
    let sql = `INSERT INTO user( name, birthday, address) VALUES ("${user.name}", "${user.birthday}", "${user.address}")`;
    if (user.name && user.birthday && user.address) {
        db.run(sql, (error) => {
            if (error) {
                res.end(error.message);
            }
            res.send(`User ${user.name} Added.`);
        });
    }
    else {
        res.send("Error on creating new user. Please check the parameters and try again.");
    }
};
exports.addUser = addUser;
const updateUser = (req, res) => {
    logger_1.default.info(req);
    let user = req.body;
    let sql = `UPDATE user SET role="${user.name}", 
                                 birthdayt="${user.birthday}", 
                                 address="${user.address}", 
                                 WHERE id="${user.id}"
                                 `;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("User Updated.");
    });
};
exports.updateUser = updateUser;
const updateUserBySpecificField = (req, res) => {
    logger_1.default.info(req);
    let user = req.body;
    let sql = `UPDATE user SET name="${user.name}"
                                   WHERE id="${user.id}"
    `;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("User Updated");
    });
};
exports.updateUserBySpecificField = updateUserBySpecificField;
const deleteUserByQuery = (req, res) => {
    logger_1.default.info(req);
    let id = req.query.id;
    let sql = `DELETE from user WHERE id="${id}"`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("User Deleted.");
    });
};
exports.deleteUserByQuery = deleteUserByQuery;
