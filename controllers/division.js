import DivisionesModel from "../models/divisiones.js"

export default class DivisionesController {
    static async devolverTodasDivisiones(req, res) {
        const divisiones = await DivisionesModel.devolverDivisiones()
        res.send(divisiones)
    }

    static async devolverDivision(req, res) {
        const { division, temporada } = req.params
        const divisionesBD = await DivisionesModel.devolverDivisiones()
        
        res.send(divisionesBD.filter(e => e.nombre == division && e.temporada == temporada)[0])
    }
}