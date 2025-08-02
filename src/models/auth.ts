import { safeQuery } from "@/utils/utils"
import type { User, UserData } from '@/types/user'

type RegisterParams = {
    nombre_usuario: string
    contraseña_hash: string
    id_tipo_usuario: string
}

export class ModelAuth {
    static async login(username: string): Promise<User[]> {
        console.log(username)
        const query = `SELECT u.id, u.nombre_usuario, u.contraseña_hash, tu.nombre 'rol' FROM usuarios u 
                        INNER JOIN tipos_usuario tu ON tu.id = u.id_tipo_usuario 
                        WHERE activo = 1 AND BINARY nombre_usuario = ?`
    
        const [err, results] = await safeQuery<UserData[]>(query, [username])

        if(err) {
            throw err
        }

        return results
    }

    static async register(userData: RegisterParams): Promise<boolean> {
        const { nombre_usuario, contraseña_hash, id_tipo_usuario } = userData
        const query = `INSERT INTO usuarios (nombre_usuario, contraseña_hash, id_tipo_usuario)
                        VALUES (?, ?, ?)`

        const [err] = await safeQuery(query, [nombre_usuario, contraseña_hash, id_tipo_usuario])
        
        if(err) throw err
        
        return true
    }

    static async saveRefreshToken(userId: number, refreshToken: string): Promise<void> {
        const query = 'UPDATE usuarios SET refresh_token = ? WHERE id = ?'
        const [err] = await safeQuery(query, [refreshToken, userId])

        if(err) throw err
    }

    static async logout(userId: number) {
        const query = 'UPDATE usuarios SET refresh_token = NULL WHERE id = ?'
        const [err] = await safeQuery(query, [userId])

        if(err) throw err
    }

    static async findByRefreshToken(refreshToken: string): Promise<User | null> {
        const query = `SELECT u.id, u.nombre_usuario, tu.nombre 'rol' FROM usuarios u 
                        INNER JOIN tipos_usuario tu ON tu.id = u.id_tipo_usuario 
                        WHERE refresh_token = ?`

        const [err, results] = await safeQuery<any>(query, [refreshToken])
        
        if(err) throw err
        
        if(!results || results.lenght === 0) return null
        
        return results[0]
    }

    static async updateRefreshToken(userId: number, newToken: string): Promise<boolean> {
        const query = 'UPDATE usuarios SET refresh_token = ? WHERE id = ?'
        const [err] = await safeQuery(query, [userId, newToken])

        return !err
    }
}