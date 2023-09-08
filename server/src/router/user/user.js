import express from "express";
const router = new express.Router();
import { user } from "../../controllers/user.js";
import { auth } from "../../auth/auth.js";


//user route 
router.route("/register").post(user.register);
router.route("/login").post(user.login);
router.route("/").get(auth,user.getUser);


export default router;