import { Router } from 'express';
import { ControllerUsers } from '@/controllers/users';
import { changePasswordSchema, userSchema } from '@/schemas/users';
import { validate } from '@/middlewares/validate';

export const routerUsers = Router(); 

routerUsers.get('/', ControllerUsers.all);
routerUsers.get('/:id', ControllerUsers.one);

routerUsers.patch('/change-pass/:id', validate(changePasswordSchema), ControllerUsers.changePassword)
routerUsers.patch('/edit/:id', validate(userSchema), ControllerUsers.edit);