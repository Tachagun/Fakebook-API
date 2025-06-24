import express from "express";
// import { getMe, login, register } from "../controllers/auth.controller.js";
import * as authController from "../controllers/auth.controller.js";
const authRoute = express.Router();

authRoute.post("/login", authController.register);
authRoute.post("/register", authController.login);
authRoute.get("/me", authController.getMe);
// authRoute.get("/me", authController.getMe("This is title"));

export default authRoute;
