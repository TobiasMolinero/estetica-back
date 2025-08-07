import { safeQuery } from "@/utils/utils";
import type { GetServices, InsertService } from "@/types/services";

export class ModelServices {
    static async all(): Promise<GetServices[] | null> {
        const query = 'SELECT id, nombre, descripcion, precio FROM servicios WHERE activo = 1';
        const [err, results] = await safeQuery<GetServices[]>(query);

        if (err) {
            throw err;
        }

        return results.length > 0 ? results : null;
    }

    static async one(id: number): Promise<GetServices[] | null> {
        const query = 'SELECT id, nombre, descripcion, precio FROM servicios WHERE id = ? AND activo = 1';
        const [err, results] = await safeQuery<GetServices[]>(query, [id]);

        if (err) {
            throw err;
        }

        return results.length > 0 ? results : null;
    }

    static async create(data: InsertService, campos: (keyof InsertService)[]): Promise<boolean> {
        const setClause = campos.map(campo => `${campo}`).join(', ')
        const values = campos.map(campo => data[campo])
        const placeholders = campos.map(() => '?').join(', ')

        const query = `INSERT INTO servicios(${setClause}) VALUES (${placeholders})`
        const [err] = await safeQuery(query, [...values]);

        if (err) {
            console.log(err)
            throw err;
        }

        return true
    }

    static async edit(id: number, data: InsertService, campos: (keyof InsertService)[]): Promise<boolean> {
        const setClause = campos.map(campo => `${campo} = ?`).join(', ')
        const values = campos.map(campo => data[campo])

        const query = `UPDATE servicios SET ${setClause} WHERE id = ?`
        const [err] = await safeQuery<InsertService>(query, [...values, id])

        if(err) throw err

        return true
    }

    static async unsubscribe(id: number): Promise<boolean> {
        const query = 'UPDATE servicios SET activo = 0 WHERE id = ?'
        const [err] = await safeQuery(query, [id])

        if(err) throw err
        
        return true
    }
}