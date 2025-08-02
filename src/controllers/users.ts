import { Request, Response } from "express";
import { safeCallModel } from "@/utils/utils";
import { ModelUsers } from "@/models/users";
import { verified, encrypt } from "@/utils/encrypt";
import { UserData } from "@/types/user";

export class ControllerUsers {
    static async all(req: Request, res: Response) {
        const [err, users] = await safeCallModel(ModelUsers.all());

        if (err) res.status(500).json({ message: "Ocurrió un error al intentar recuperar la lista de usuarios." })

        if(!users || users.length === 0) res.status(404).json({ message: "No se encontraron usuarios registrados." })

        res.status(200).json({ data: users });
    }

    static async one(req: Request, res: Response) {
        const userId = Number(req.params.id)

        if (isNaN(userId)) res.status(400).json({ message: "ID de usuario inválido." })

        const [err, user] = await safeCallModel(ModelUsers.one(userId));

        if(err) res.status(500).json({ message: "Ocurrió un error al intentar recuperar los datos del usuario." })

        if(!user || user.length === 0) res.status(404).json({ message: "No se encontró el usuario." })

        res.status(200).json({ data: user });
    }

    static async changePassword(req: Request, res: Response) {
        const userId = Number(req.params.id)
        const { newPassword, oldPassword } = req.body

        const [err, user] = await safeCallModel(ModelUsers.one(userId))
        if (err) res.status(500).json({ message: "Ocurrió un error en el servidor. Vuelva a intentarlo más tarde." })

        if(!user || user.length === 0) {
            res.status(404).json({ message: "Usuario no encontrado." })
        } else {
            const samePassword = await verified(oldPassword, user[0].contraseña_hash)
            if(!samePassword) res.status(401).json({ message: "Contraseña actual incorrecta." })
                
            const isSameAsOld = await verified(newPassword, user[0].contraseña_hash)
            if(isSameAsOld) res.status(400).json({ message: "La nueva contraseña no puede ser la misma que la actual." })
                
            const newPasswordHash = await encrypt(newPassword)  
            const [err] = await safeCallModel(ModelUsers.changePassword(userId, newPasswordHash))

            if (err) res.status(500).json({ message: "Ocurrió un error al intentar cambiar la contraseña. Vuelva a intentarlo más tarde." })

            res.status(200).json({ message: "¡La contraseña fue modificada con éxito!" })
        }
        
    }
}