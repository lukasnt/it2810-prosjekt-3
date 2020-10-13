import express, { Router } from "express";
import userRoutes from "./controllers/user";
import movieRoutes from "./controllers/movie";

const router : Router = express.Router();

router.use("/user", userRoutes);
router.use("/movie", movieRoutes);

export default router;