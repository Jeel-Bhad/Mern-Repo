import { Router } from "express";
import { createNewUser } from "src/controllers/auth";
import validate from "src/middleware/validator";
import { newUserSchema } from "src/utils/validationSchema";

const authRouter = Router();

authRouter.post("/sign-up",validate(newUserSchema),createNewUser);

authRouter.post("/sign-in");
authRouter.post("/verify");
authRouter.post("/refresh-token");

export default authRouter;