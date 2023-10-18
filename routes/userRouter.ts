import { Router } from "express";
import {
    userRoot,
    userList,
    userDetailsByQuery,
    userDetailsByParams,
    addUser,
    updateUser,
    deleteUserByQuery,
    updateUserBySpecificField
} from "../controller/userController";

const userRouter = Router();
userRouter.get("/", userRoot);
userRouter.get("/userList", userList);
userRouter.get("/userDetails/", userDetailsByQuery);
userRouter.get("/userDetails/:name", userDetailsByParams);
userRouter.post("/addUser", addUser);
userRouter.put("/updateUser", updateUser);
userRouter.patch("/updateuserBySpecificField", updateUserBySpecificField);
userRouter.delete("/deleteuser", deleteUserByQuery);

export default userRouter;