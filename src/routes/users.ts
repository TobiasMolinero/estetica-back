import { Router } from 'express';
import { ControllerUsers } from '@/controllers/users';

export const routerUsers = Router(); 

routerUsers.get('/', ControllerUsers.all);
routerUsers.get('/:id', ControllerUsers.one);

routerUsers.put('/:id', ControllerUsers.changePassword)