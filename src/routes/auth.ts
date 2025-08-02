import { ControllerAuth } from "@/controllers/auth";
import { Router } from "express";

export const routerAuth = Router()

routerAuth.post('/login', ControllerAuth.login)
routerAuth.post('/refresh-token', ControllerAuth.refreshToken)
routerAuth.post('/register', ControllerAuth.register)

routerAuth.put('/logout/:id', ControllerAuth.logout)