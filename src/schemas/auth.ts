import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Se requiere el nombre de usuario.'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.')
  .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
  .regex(/[a-z]/, 'Debe contener al menos una letra minúscula')
  .regex(/[0-9]/, 'Debe contener al menos un número')
  .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial'),
});

export const registerSchema = z.object({
  nombre_usuario: z.string().min(1, 'Se requiere el nombre de usuario.'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.')
  .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
  .regex(/[a-z]/, 'Debe contener al menos una letra minúscula')
  .regex(/[0-9]/, 'Debe contener al menos un número')
  .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial'),
});

export const logoutSchema = z.object({
  id: z.string().min(1, 'Se requiere el ID del usuario para cerrar sesión.')
});