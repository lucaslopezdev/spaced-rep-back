import { z } from 'zod';
export const signupSchema = z.object({
    name: z
        .string({
        required_error: 'El nombre es requerido',
        invalid_type_error: 'El nombre debe ser un texto'
    })
        .min(1)
        .max(50),
    email: z
        .string({
        required_error: 'El email es requerido',
        invalid_type_error: 'El email debe ser un texto'
    })
        .email({ message: 'Ingrese un email valido' }),
    password: z
        .string({
        required_error: 'La contraseña es requerida',
        invalid_type_error: 'La contraseña debe ser un texto'
    })
        .min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
    })
        .max(100)
});
export const signinSchema = z.object({
    email: z
        .string({
        required_error: 'El email es requerido',
        invalid_type_error: 'El email debe ser un texto'
    })
        .email({ message: 'Ingrese un email valido' }),
    password: z
        .string({
        required_error: 'La contraseña es requerida',
        invalid_type_error: 'La contraseña debe ser un texto'
    })
        .min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
    })
});
