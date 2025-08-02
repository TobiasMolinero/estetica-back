import { UserData } from "@/types/user";
import { safeQuery } from "@/utils/utils";

export class ModelUsers {
    static async all(): Promise<UserData[] | null> {
        const query = `SELECT u.id, u.nombre_usuario, u.contraseña_hash, u.id_tipo_usuario, tu.nombre 'rol' FROM usuarios u 
                        INNER JOIN tipos_usuario tu ON tu.id = u.id_tipo_usuario 
                        WHERE activo = 1`;

        const [err, result] = await safeQuery<UserData[]>(query);
        
        if (err) throw err
        
        return result.length > 0 ? result : null
    }

    static async one(userId: number): Promise<UserData[] | null> {
        const query = `SELECT u.id, u.nombre_usuario, u.contraseña_hash, u.id_tipo_usuario, tu.nombre 'rol' FROM usuarios u 
                        INNER JOIN tipos_usuario tu ON tu.id = u.id_tipo_usuario 
                        WHERE activo = 1 AND u.id = ?`;

        const [err, result] = await safeQuery<UserData[]>(query, [userId]);
        
        if (err) throw err
        
        return result.length > 0 ? result : null
    }

    static async changePassword(userId: number, newPasswordHash: string): Promise<boolean> {
        const query = `UPDATE usuarios SET contraseña_hash = ? WHERE id = ?`;

        const [err] = await safeQuery(query, [newPasswordHash, userId]);
        
        if (err) throw err

        return true
    }
}