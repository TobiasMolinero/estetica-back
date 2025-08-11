import { safeCallModel } from "@/utils/utils";
import { ModelCustomers } from "@/models/customers";
import { Response, Request } from "express";

export class ControllerCustomers {
    static async all(req: Request, res: Response) {
        const [err, customers] = await safeCallModel(ModelCustomers.all())

        if(err) return res.status(500).json({ message: 'Ocurrió un error en el servidor. Vuelva a intenarlo más tarde.'})

        return res.status(200).json(customers)
    }

    static async one(req: Request, res: Response) {
        const id = Number(req.params.id)
        const [err, customer] = await safeCallModel(ModelCustomers.one(id))

        if(err) return res.status(500).json({ message: 'Ocurrió un error en el servidor. Vuelva a intenarlo más tarde.'})

        return res.status(200).json(customer)
    }

    static async create(req: Request, res: Response) {
        const data = req.body
        const campos = Object.keys(data)
        const [err] = await safeCallModel(ModelCustomers.create(data, campos))

        if(err) return res.status(500).json({ message: 'Ocurrió un error en el servidor. Vuelva a intenarlo más tarde.'})

        return res.status(200).json({ message: 'El cliente fue registrado con éxito.' })
    }

    static async edit(req: Request, res: Response) {
        const id = Number(req.params.id)
        const data = req.body
        const campos = Object.keys(data)

        const [err] = await safeCallModel(ModelCustomers.edit(id, data, campos))

        if(err) return res.status(500).json({ message: 'Ocurrió un error en el servidor. Vuelva a intentarlo más tarde.'})

        return res.status(200).json({ message: 'Los datos se modificarón con exito.' })
    }

    static async unsubscribe(req: Request, res: Response) {
        const id = Number(req.params.id)

        const [err] = await safeCallModel(ModelCustomers.unsubscribe(id))
console.log(err)
        if(err) return res.status(500).json({ message: 'Ocurrió un error en el servidor. Vuelva a intentarlo más tarde.' })
 
        return res.status(200).json({ message: 'El cliente se dio de baja con éxito.' })
    }
}
