import { Request, Response } from "express";
import { safeCallModel } from "@/utils/utils";
import { ModelUsers } from "@/models/users";
import { verified, encrypt } from "@/utils/encrypt";
import { User } from "@/types/user";

export class ControllerUsers {
    static async all(req: Request, res: Response): Promise<Response> {
        const [err, users] = await safeCallModel(ModelUsers.all());

        if (err) return res.status(500).json({ message: "Ocurrió un error al intentar recuperar la lista de usuarios." })

        if (!users || users.length === 0) return res.status(404).json({ message: "No se encontraron usuarios registrados." })

        return res.status(200).json(users);
    }

    static async one(req: Request, res: Response): Promise<Response | undefined> {
        const userId = Number(req.params.id)

        if (isNaN(userId)) return res.status(400).json({ message: "ID de usuario inválido." })

        const [err, user] = await safeCallModel(ModelUsers.one(userId));

        if (err) return res.status(500).json({ message: "Ocurrió un error al intentar recuperar los datos del usuario." })

        if (!user || user.length === 0) return res.status(404).json({ message: "No se encontró el usuario." })

        if (user) {
            const { contraseña_hash, ...userWithoutPassword } = user[0];
            return res.status(200).json(userWithoutPassword);
        }
    }

    static async edit(req: Request, res: Response): Promise<Response> {
        const userId = Number(req.params.id)
        const { nombre_usuario, id_tipo_usuario } = req.body;
        const userData: Partial<User> = { nombre_usuario, id_tipo_usuario }

        const [err] = await safeCallModel(ModelUsers.edit(userId, userData));

        if (err) return res.status(500).json({ message: "Ocurrió un error al intentar recuperar los datos del usuario." })

        return res.status(200).json({ message: "Los datos se modificarón correctamente." })
    }

    static async changePassword(req: Request, res: Response): Promise<Response> {
        const userId = Number(req.params.id)
        const { newPassword, oldPassword } = req.body

        const [err, user] = await safeCallModel(ModelUsers.one(userId))
        if (err) return res.status(500).json({ message: "Ocurrió un error inesperado. Vuelva a intentarlo más tarde." })

        if (!user || user.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado." })
        } else {
            const samePassword = await verified(oldPassword, user[0].contraseña_hash)
            if (!samePassword) return res.status(401).json({ message: "Contraseña actual incorrecta." })

            const isSameAsOld = await verified(newPassword, user[0].contraseña_hash)
            if (isSameAsOld) return res.status(400).json({ message: "La nueva contraseña no puede ser la misma que la actual." })

            const newPasswordHash = await encrypt(newPassword)
            const [err] = await safeCallModel(ModelUsers.changePassword(userId, newPasswordHash))

            if (err) return res.status(500).json({ message: "Ocurrió un error al intentar cambiar la contraseña. Vuelva a intentarlo más tarde." })

            return res.status(200).json({ message: "¡La contraseña fue modificada con éxito!" })
        }
    }
}