import { Router } from "express";
import { validate } from "@/middlewares/validate";
import { ControllerAuth } from "@/controllers/auth";
import { loginSchema, refreshTknSchema, registerSchema } from "@/schemas/auth";

export const routerAuth = Router()

routerAuth.post('/login', validate(loginSchema), ControllerAuth.login)
routerAuth.post('/refresh-token', validate(refreshTknSchema), ControllerAuth.refreshToken)
routerAuth.post('/register', validate(registerSchema), ControllerAuth.register)

routerAuth.patch('/logout/:id', ControllerAuth.logout)