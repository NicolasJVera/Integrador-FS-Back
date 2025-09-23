import { Router } from "express";
import hasErrors from "../middlewares/hasErrors.js";
import loginValidator from "../validations/login.js";
import registerValidator from "../validations/register.js";
import { login, refreshToken, register, me } from "../controllers/auth.js";
import tokenValidator from "../validations/token.js";

const router = Router();

router.post("/register", [registerValidator, hasErrors], register);
router.post("/login", [loginValidator, hasErrors], login);

router.post("/refresh", [tokenValidator, hasErrors], refreshToken);

router.get("/me", me);

export default router;
