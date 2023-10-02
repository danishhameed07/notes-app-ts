import * as express from "express";
import noteRoutes from "./note.route";
import userRoutes from "./user.route";

const router = express.Router();

// v1/
router.use("/note", noteRoutes);
router.use("/user", userRoutes);

export default router;
