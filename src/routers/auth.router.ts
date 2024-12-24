import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";
import {TokenValidator} from "../validators/token.validator";

const router = Router();

router.post(
    "/sign-up",
    commonMiddleware.validateBody(UserValidator.create),
    authController.signUp,
);
router.post(
    "/sign-in",
    commonMiddleware.validateBody(UserValidator.login),
    authController.signIn,
);

router.post(
    "/refresh",
    authMiddleware.checkRefreshToken,
    authController.refresh,
);

router.post(
    "/logout",
    commonMiddleware.validateBody(TokenValidator.logout),
    authController.logOutOne,
);

router.post("/logout-all",
    commonMiddleware.validateBody(TokenValidator.logout),
    authController.logOut,)

export const authRouter = router;