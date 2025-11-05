import { Router } from "express";
import { asyncHandler } from "../../shared/middleware/responseHandler";
import { signIn, signUp, signOut } from "./user.controller";

const router = Router();

router.post("/sign-up", asyncHandler(signUp));
router.post("/sign-in", asyncHandler(signIn));
router.post("/sign-out", asyncHandler(signOut));

export default router;
