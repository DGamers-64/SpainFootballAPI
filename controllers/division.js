import DivisionesModel from "../models/divisiones.js"

export default class DivisionesController {
    static async devolverTodasDivisiones(req, res) {
        const divisiones = await DivisionesModel.devolverDivisiones()
        res.send(divisiones)
    }
}