import { Router } from "express";
import { asyncHandler } from "../../shared/middleware/responseHandler";
import { signIn, signUp, signOut, filterUser } from "./user.controller";

const router = Router();

router.post("/sign-up", asyncHandler(signUp));
router.post("/sign-in", asyncHandler(signIn));
router.post("/sign-out", asyncHandler(signOut));
router.get("/filter-user", asyncHandler(filterUser));

export default router;
