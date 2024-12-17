import { Router } from "express";

import { userController } from "../controllers/user.controller";
import {commonMiddleware} from "../middlewares/common.middleware";
import {createShema, updateShema} from "../schemas/user.schema";

const router = Router();

router.get("/", userController.getList);
router.post("/", commonMiddleware.validateBody(createShema), userController.create);

router.get("/:userId",commonMiddleware.isIdvalid("userId"), userController.getUserById);
router.put("/:userId",commonMiddleware.isIdvalid("userId"),commonMiddleware.validateBody(updateShema), userController.updateUser);
router.delete("/:userId", commonMiddleware.isIdvalid("userId"), userController.deleteUser);

export const userRouter = router;