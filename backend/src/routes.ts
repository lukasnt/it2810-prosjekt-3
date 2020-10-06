import express, { Router } from "express";
import userRoutes from "./controllers/user";

const router : Router = express.Router();

router.use("/user", userRoutes);

export default router;