import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Se requiere el nombre de usuario.'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.')
  .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
  .regex(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
  .regex(/[0-9]/, 'La contraseña debe contener al menos un número')
  .regex(/[^A-Za-z0-9]/, 'La contraseña debe contener al menos un carácter especial'),
}).strict();

export const registerSchema = z.object({
  username: z.string().min(1, 'Se requiere el nombre de usuario.'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.')
  .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
  .regex(/[a-z]/, 'Debe contener al menos una letra minúscula')
  .regex(/[0-9]/, 'Debe contener al menos un número')
  .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial'),
}).strict();

export const refreshTknSchema = z.object({
  refreshToken: z.string().min(1, 'Se requiere el token de actualización.'),
}).strict();