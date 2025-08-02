import { safeCallModel } from "@/utils/utils";
import { Request, Response } from "express";
import { ModelAuth } from "@/models/auth";
import { verified } from "@/utils/encrypt";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "@/utils/jwt";

export class ControllerAuth {
    static async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body
        const [err, results] = await safeCallModel(ModelAuth.login(username))
        if(err) res.status(500).json({ message: 'Ocurrió un error en el servidor. Vuelva a intentarlo más tarde.' })

        if(results){
            if(results.length === 0) res.status(404).json({ message: 'El usuario ingresado no existe.' })
            
            const [user] = results
            const passwordMatch = verified(password, user.contraseña_hash)

            if(!passwordMatch) res.status(401).json({ message: 'Contraseña incorrecta.' })

            const {contraseña_hash, ...userData} = user
            const accessToken = generateAccessToken({ userId: userData.id, role: userData.rol })
            const refreshToken = generateRefreshToken({ userId: userData.id, role: userData.rol })

            const [saveErr] = await safeCallModel(ModelAuth.saveRefreshToken(userData.id, refreshToken))
            if(saveErr) res.status(500).json({ message: 'Ocurrió un error en el servidor. Vuelva a intentarlo más tarde.' })

            const responseData = {
                ...userData,
                access_tkn: accessToken, 
                refresh_tkn: refreshToken
            }

            res.status(200).json({
                message: '¡Iniciaste sesión con exito!',
                data: responseData,
            })
        }
    }

    static async logout(req: Request, res: Response) {
        const id = Number(req.params.id)
        const [err] = await safeCallModel(ModelAuth.logout(id))

        if(err) res.status(500).json({ message: 'Ocurrió un error en el servidor. Vuelva a intentarlo más tarde.'})

        res.status(200).json({ message: 'Sesión cerrada.'})
    }
    
    static async refreshToken(req: Request, res: Response): Promise<void> {
        const { refreshToken } = req.body
    
        if(!refreshToken) res.status(401).json({ data: 'NO_REF_TKN', message: 'La sesión expiró. Vuelva a iniciar sesión.' })
        
        const payload = verifyRefreshToken(refreshToken)
        const [err, user] = await safeCallModel(ModelAuth.findByRefreshToken(refreshToken))

        if(err) res.status(500).json({ message: 'Ocurrió un error en el servidor. Vuelva a intentarlo más tarde.'})

        if(!user || user.id !== payload.userId) res.status(403).json({ data: 'NO_REF_TKN', message: 'La sesión expiró. Vuelva a iniciar sesión.'})

        if(user) {
            const accessToken = generateAccessToken({ userId: user.id, role: user.rol})
            const newRefreshToken = generateRefreshToken({ userId: user.id, role: user.rol })

            const updated = ModelAuth.updateRefreshToken(user.id, newRefreshToken)

            if(!updated) res.status(500).json({ data: 'NO_REF_TKN', message: 'La sesión expiró. Vuelva a iniciar sesión.'})
            
            res.status(200).json({ 
                data: {
                    message: 'TKNS_OK',
                    access_tkn: accessToken,
                    refresh_tkn: refreshToken
                }
            })
        }
    }
}