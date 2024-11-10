import express from "express";
import UserController from "../controllers/user_controller.js";
const userRouter = express.Router();

userRouter.get("/", UserController.index);
userRouter.get("/new", UserController.new);
userRouter.get("/edit/:id", UserController.edit);  // New route to load the edit form
userRouter.put("/update/:id", UserController.update)
userRouter.post("/create", UserController.create);
userRouter.delete("/delete/:id", UserController.delete);

export default userRouter