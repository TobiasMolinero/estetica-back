import { ResultSetHeader, RowDataPacket } from "mysql2"

export interface Service {
    id: number
    nombre: string
    descripcion?: string
    precio: number
}

export type GetServices = Service & RowDataPacket
export type InsertService = Partial<Service> & ResultSetHeader