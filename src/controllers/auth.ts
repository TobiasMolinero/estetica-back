import { safeCallModel } from "@/utils/utils";
import { Request, Response } from "express";
import { ModelAuth } from "@/models/auth";
import { encrypt, verified } from "@/utils/encrypt";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "@/utils/jwt";

export class ControllerAuth {
    static async login(req: Request, res: Response): Promise<Response | undefined> {
        const { username, password } = req.body
        const [err, results] = await safeCallModel(ModelAuth.login(username))

        if (err) return res.status(500).json({ message: 'Ocurrió un error inesperado. Vuelva a intentarlo más tarde.' })

        if (results) {
            if (results.length === 0) return res.status(404).json({ message: 'El usuario ingresado no existe.' })

            const [user] = results
            const passwordMatch = verified(password, user.contraseña_hash)

            if (!passwordMatch) return res.status(401).json({ message: 'Contraseña incorrecta.' })

            const { contraseña_hash, ...userData } = user
            const accessToken = generateAccessToken({ userId: userData.id, role: userData.rol })
            const refreshToken = generateRefreshToken({ userId: userData.id, role: userData.rol })

            const [saveErr] = await safeCallModel(ModelAuth.saveRefreshToken(userData.id, refreshToken))
            if (saveErr) return res.status(500).json({ message: 'Ocurrió un error inesperado. Vuelva a intentarlo más tarde.' })

            const responseData = {
                ...userData,
                access_tkn: accessToken,
                refresh_tkn: refreshToken
            }

            return res.status(200).json({
                message: '¡Iniciaste sesión con exito!',
                data: responseData,
            })
        }
    }

    static async register(req: Request, res: Response): Promise<Response> {
        const { nombre_usuario, contraseña, id_tipo_usuario } = req.body;
        const contraseña_hash = await encrypt(contraseña)
        const [err] = await safeCallModel(ModelAuth.register({ nombre_usuario, contraseña_hash, id_tipo_usuario }))

        if (err) return res.status(500).json({ message: 'Ocurrió un error inesperado. Vuelva a intentarlo más tarde.' })

        return res.status(201).json({ message: 'Usuario registrado con éxito.' })
    }

    static async logout(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id)
        const [err] = await safeCallModel(ModelAuth.logout(id))

        if (err) return res.status(500).json({ message: 'Ocurrió un error inesperado. Vuelva a intentarlo más tarde.' })

        return res.status(200).json({ message: 'Sesión cerrada.' })
    }

    static async refreshToken(req: Request, res: Response): Promise<Response | undefined> {
        const { refreshToken } = req.body

        if (!refreshToken) return res.status(401).json({ error: 'NO_REF_TKN', message: 'La sesión expiró. Vuelva a iniciar sesión.' })

        const payload = verifyRefreshToken(refreshToken)
        const [err, user] = await safeCallModel(ModelAuth.findByRefreshToken(refreshToken))

        if (err) return res.status(500).json({ message: 'Ocurrió un error inesperado. Vuelva a intentarlo más tarde.' })

        if (!user || user.id !== payload.userId) return res.status(403).json({ error: 'NO_REF_TKN', message: 'La sesión expiró. Vuelva a iniciar sesión.' })

        if (user) {
            const accessToken = generateAccessToken({ userId: user.id, role: user.rol })
            const newRefreshToken = generateRefreshToken({ userId: user.id, role: user.rol })

            const updated = await ModelAuth.updateRefreshToken(user.id, newRefreshToken)

            if (!updated) return res.status(500).json({ error: 'NO_REF_TKN', message: 'La sesión expiró. Vuelva a iniciar sesión.' })

            return res.status(200).json({
                datos: {
                    message: 'TKNS_OK',
                    access_tkn: accessToken,
                    refresh_tkn: refreshToken
                }
            })
        }
    }
}