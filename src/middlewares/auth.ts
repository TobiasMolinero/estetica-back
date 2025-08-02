import { verifyAccessToken } from '@/utils/jwt'
import { NextFunction, Request, Response } from 'express'

export interface AuthenticatedRequest extends Request {
    user: {
        userId: number
        role: string
    }
}

export async function authenticateAccessToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const accessToken = authHeader && authHeader.split(' ')[1]

    if(!accessToken) return res.status(401).json({ data: 'NO_ACC_TKN', message: 'La sesión expiró. Vuelva a iniciar sesión.' })

    try {
        const payload = verifyAccessToken(accessToken)
        req.user = payload
        next()
    } catch (err) {
        return res.status(403).json({ data: 'NO_ACC_TKN', message: 'La sesión expiró. Vuelva a iniciar sesión.' })
    }
}