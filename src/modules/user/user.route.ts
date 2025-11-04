import { Router } from "express";
import { testing } from "./user.controller";

const router = Router();

router.get("/testing", testing);

export default router;
