import { Router } from "express";
import { asyncHandler } from "../../shared/middleware/responseHandler";
import { createEvent, filterEvent, getEventById, updateEventById, deleteEventById } from "./event.controller";
import {verifyAccessToken} from '../../shared/middleware/token';

const router = Router();

router.post("/create-event", verifyAccessToken(["ADMIN", "ORGANIZER"]), asyncHandler(createEvent));
router.get("/filter-event", asyncHandler(filterEvent));
router.get("/get-event/:id", asyncHandler(getEventById));
router.put("/update-event/:id", asyncHandler(updateEventById));
router.delete("/delete-event/:id", asyncHandler(deleteEventById));

export default router;
