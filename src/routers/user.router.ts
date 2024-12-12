import {Router} from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getList);
router.post("/", userController.create);
router.get("/:userID", userController.find);
router.delete("/:userID", userController.delete);
router.put("/:userID", userController.modern)

export const userRouter = router;