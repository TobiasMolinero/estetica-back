import { safeQuery } from "@/utils/utils"

export class ModelCustomers {
    static async all() {
        const query = `SELECT id, nro_documento, nombre, apellido, email, telefono FROM clientes
                        WHERE activo = 1;`
        const [err, results] = await safeQuery(query)

        if(err) throw err

        return results
    }

    static async one(id: number) {
        const query = `SELECT id, nro_documento, nombre, apellido, email, telefono FROM clientes
                        WHERE id = ? AND activo = 1;`

        const [err, results] = await safeQuery(query, [id])

        if(err) throw err

        return results
    }

    static async create(data: any, campos: any) {
        const setClause = campos.map((campo: any) => `${campo}`).join(', ')
        const values = campos.map((campo: any) => data[campo])
        const placeholders = campos.map(() => '?').join(', ')

        const query = `INSERT INTO clientes(${setClause}) VALUES(${placeholders});`
        const [err] = await safeQuery(query, [...values])

        if(err) throw err

        return true
    }

    static async edit(id: number, data: any, campos: any) {
        const setClause = campos.map((campo: any) => `${campo} = ?`).join(', ')
        const values = campos.map((campo: any) => data[campo])

        const query = `UPDATE clientes SET ${setClause} WHERE id = ?`
        const [err] = await safeQuery(query, [...values, id])

        if(err) throw err

        return true
    }

    static async unsubscribe(id: number) {
        const query = `UPDATE clientes SET activo = 0 WHERE id = ?`
        const [err] = await safeQuery(query, [id])

        if(err) throw err

        return true
    }
}