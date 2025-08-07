import { Router } from 'express';
import { validate } from '@/middlewares/validate';
import { createServiceSchema, updateServiceSchema } from '@/schemas/services';
import { ControllerServices } from '@/controllers/services';

export const routerServices = Router();

routerServices.get('/', ControllerServices.all)
routerServices.get('/:id', ControllerServices.one)

routerServices.post('/', validate(createServiceSchema), ControllerServices.create)
routerServices.patch('/edit/:id', validate(updateServiceSchema), ControllerServices.edit);
routerServices.patch('/unsubscribe/:id', ControllerServices.unsubscribe)
