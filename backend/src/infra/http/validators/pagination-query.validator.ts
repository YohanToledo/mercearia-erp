import { z } from 'zod'

export const PaginationQueryParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
  limit: z
    .string()
    .optional()
    .default('10')
    .transform(Number)
    .pipe(z.number().min(1)),
})

export type PaginationQueryParamsSchema = z.infer<
  typeof PaginationQueryParamsSchema
>
