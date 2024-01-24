import { z } from 'zod'

export const createCardSchema = z.object({
  name: z.string({
    required_error: 'El nombre de la tarjeta es requerido',
    invalid_type_error: 'La tarjeta debe ser un texto'
  }).min(1).max(255),
  solution: z.string({
    required_error: 'La respuesta de la tarjeta es requerida',
    invalid_type_error: 'La respuesta debe ser un texto'
  }).min(1)
})

export const updateCardSchema = z.object({
  name: z.string({
    invalid_type_error: 'La tarjeta debe ser un texto'
  }).min(1).max(255).optional(),
  solution: z.string({
    invalid_type_error: 'La respuesta debe ser un texto'
  }).min(1).optional()
})