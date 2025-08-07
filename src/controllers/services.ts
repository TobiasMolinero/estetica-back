import { ModelServices } from "@/models/services";
import { InsertService, Service } from "@/types/services";
import { safeCallModel } from "@/utils/utils";
import { Request, Response } from "express";

export class ControllerServices {
    static async all(req: Request, res: Response): Promise<Response> {
        const [err, results] = await safeCallModel(ModelServices.all())

        if(err) return res.status(500).json({ message: 'Ocurrió un error inesperado. Vuelva a intentarlo más tarde.'})
        
        if(!results || results.length === 0) return res.status(404).json({ message: 'No se encontraron servicios registrados en el sistema.'})

        return res.status(200).json(results)
    }

    static async one(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id)
        const [err, results] = await safeCallModel(ModelServices.one(id))

        if(err) return res.status(500).json({ message: 'Ocurrió un error inesperado. Vuelva a intentarlo más tarde.'})

        if(!results || results.length === 0) return res.status(404).json({ message: 'No se encontraron datos de este servicio.' })

        return res.status(200).json(results)
    }

    static async create(req: Request, res: Response): Promise<Response> {
        const data = req.body as InsertService
        const campos = Object.keys(data) as (keyof InsertService)[]

        const [err] = await safeCallModel(ModelServices.create(data, campos))

        if(err) return res.status(500).json({ message: 'Ocurrió un error inesperado. Vuelva a intentarlos más tarde.'})
    
        return res.status(200).json({ message: 'El nuevo servicio se creo con éxito.'})
    }

    static async edit(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id)
        const data = req.body as InsertService
        const campos = Object.keys(data) as (keyof InsertService)[]

        const [err] = await safeCallModel(ModelServices.edit(id, data, campos))
        if(err) return res.status(500).json({ message: 'Ocurrió un error inesperado. Vuelva a intentarlo más tarde.'})

        return res.status(200).json({ message: 'Los datos del servicio se modificaron con éxito.'})
    }

    static async unsubscribe(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id)
        const [err] = await safeCallModel(ModelServices.unsubscribe(id))

        if(err) return res.status(500).json({ message: 'Ocurrió un error inesperado. Vuelva a intentarlo más tarde.'})

        return res.status(200).json({ message: 'El servicio se dio de baja con éxito'})
    }
}