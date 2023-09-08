import express from "express"
const router = new express.Router();
import { auth } from "../../auth/auth.js";
import { video } from "../../controllers/video.js";
import { upload } from "../../util/multer.js";


router.route("/convert").post(auth,upload.single("video"), video.convertVideo);

export default router;