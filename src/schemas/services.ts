import { z } from 'zod'

export const createServiceSchema = z.object({
    nombre: z.string().min(1, 'Se requiere un nombre de servicio para registrarlo.'),
    precio: z.number().positive(),
    descripcion: z.string().optional()
}).strict()

export const updateServiceSchema = createServiceSchema.partial()