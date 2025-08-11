import { Router } from "express";
import { ControllerCustomers } from '../controllers/customers';
import { validate } from "@/middlewares/validate";
import { createCustomerSchema, updateCustomerSchema } from "@/schemas/customers";

export const routerCustomers = Router()

routerCustomers.get('/', ControllerCustomers.all)
routerCustomers.get('/:id', ControllerCustomers.one)

routerCustomers.post('/', validate(createCustomerSchema), ControllerCustomers.create)

routerCustomers.patch('/edit/:id', validate(updateCustomerSchema), ControllerCustomers.edit)
routerCustomers.patch('/unsubscribe/:id', ControllerCustomers.unsubscribe)