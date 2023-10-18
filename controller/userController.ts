import { Response, Request, NextFunction } from "express";
import user from "../models/User";
import { createDataBase } from "../db/dbConfig";
import { Database } from "sqlite3";
import logger from "../services/logger";

let db: Database = createDataBase();
const userRoot = (req: Request, res: Response, next: NextFunction) => {
    res.send("User's Home Page");
}

const userList = (req: Request, res: Response) => {
    let userList: user[] = [];
    let sql = `SELECT * FROM user`;
    db.all(sql, [], (error: Error, rows: user[]) => {
        if (error) {
            logger.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row: user) => { userList.push(row) });
        logger.info(req);
        res.send(userList);
    });
}

const userDetailsByQuery = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.query.id;
    let sql = `SELECT * FROM user WHERE id="${id}"`;
    db.all(sql, [], (error: Error, rows: user[]) => {
        if (error) {
            res.send(error.message);
        }
        if (rows.length > 0) {
            res.send(rows[0]);
        } else {
            res.send("User not found.");
        }
    });
}

const userDetailsByParams = (req: Request, res: Response) => {
    logger.info(req);
    let name = req.params.name;
    let sql = `SELECT * FROM user WHERE name="${name}"`;
    db.all(sql, [], (error: Error, rows: user[]) => {
        if (error) {
            res.send(error.message);
        }
        if (rows.length > 0) {
            res.send(rows[0]);
        } else {
            res.send("User not found.");
        }
    });
}

const addUser = (req: Request, res: Response) => {
        let user: user = req.body;
        let sql = `INSERT INTO user( name, birthday, address) VALUES ("${user.name}", "${user.birthday}", "${user.address}")`;
        if (user.name && user.birthday && user.address) {
            db.run(sql,
                (error: Error) => {
                    if (error) {
                        res.end(error.message);
                    }
                    res.send(`User ${user.name} Added.`);
                })
        } else {
            res.send("Error on creating new user. Please check the parameters and try again.");
        }
}

const updateUser = (req: Request, res: Response) => {
    logger.info(req);
    let user: user = req.body;
    let sql = `UPDATE user SET role="${user.name}", 
                                 birthdayt="${user.birthday}", 
                                 address="${user.address}", 
                                 WHERE id="${user.id}"
                                 `;
    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("User Updated.");
    });
}

const updateUserBySpecificField = (req: Request, res: Response) => {
    logger.info(req);
    let user: user = req.body;
    let sql = `UPDATE user SET name="${user.name}"
                                   WHERE id="${user.id}"
    `
    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("User Updated");
    });
}

const deleteUserByQuery = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.query.id;
    let sql = `DELETE from user WHERE id="${id}"`;
    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("User Deleted.");
    })
}

export {
    userRoot,
    userList,
    userDetailsByQuery,
    userDetailsByParams,
    addUser,
    updateUser,
    updateUserBySpecificField,
    deleteUserByQuery
};