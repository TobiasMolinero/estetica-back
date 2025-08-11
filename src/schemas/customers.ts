import { z } from 'zod'

export const createCustomerSchema = z.object({
    nro_documento: z.int('Se requiere un número de documento.').min(1),
    nombre: z.string().min(1).max(100),
    apellido: z.string().min(1).max(100),
    telefono: z.string().min(1).max(20),
    email: z.string().optional()
}).strict()

export const updateCustomerSchema = createCustomerSchema.partial()