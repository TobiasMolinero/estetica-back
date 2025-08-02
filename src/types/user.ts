import { RowDataPacket } from "mysql2"

export interface User {
    id: number
    nombre_usuario: string
    contraseña: string
    contraseña_hash: string
    rol: string
    id_tipo_usuario: string
}

export type UserData = User & RowDataPacket
