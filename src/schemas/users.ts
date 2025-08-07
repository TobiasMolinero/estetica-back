import { z } from 'zod'

export const userSchema = z.object({
  nombre_usuario: z.string().min(1, 'Se requiere el nombre de usuario.'),
  id_tipo_usuario: z.number().int().positive('El tipo de usuario debe ser un número entero positivo.'),
}).strict();

export const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(6, 'La nueva contraseña debe tener al menos 6 caracteres.')
    .regex(/[A-Z]/, 'La nueva contraseña debe contener al menos una letra mayúscula') 
    .regex(/[a-z]/, 'La nueva contraseña debe contener al menos una letra minúscula')
    .regex(/[0-9]/, 'La nueva contraseña debe contener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'La nueva contraseña debe contener al menos un carácter especial'),
}).refine(data => data.oldPassword !== data.newPassword, {
  message: 'La nueva contraseña no puede ser la misma que la actual.',
}).strict();