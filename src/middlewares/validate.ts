import { z } from 'zod'
import { NextFunction, Request, Response } from "express"

export const validate = (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({ data: 'INVALID_DATA', message: 'Datos inválidos.' })
    }

    req.body = result.data
    next()
}