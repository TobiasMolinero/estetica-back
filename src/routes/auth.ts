import { ControllerAuth } from "@/controllers/auth";
import { Router } from "express";

export const routerAuth = Router()

routerAuth.post('/login', ControllerAuth.login)
routerAuth.put('/logout/:id', ControllerAuth.logout)
routerAuth.post('/refresh-token', ControllerAuth.refreshToken)