import EquiposModel from "../models/equipos.js"

export default class EquiposController {
    static async devolverTodosEquipos(req, res) {
        const equipos = await EquiposModel.devolverEquipos()
        res.send(equipos)
    }
}