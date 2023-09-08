import express from "express";
const router = new express.Router();
import userRouter from "./user/user.js";
import videoRouter from "./video/videoRoute.js";

router.use("/user",userRouter);
router.use("/video",videoRouter);

export default router;