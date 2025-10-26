import EquiposModel from "../models/equipos.js"

export default class EquiposController {
    static async devolverTodosEquipos(req, res) {
        const equipos = await EquiposModel.devolverEquipos()
        res.send(equipos)
    }

    static async devolverEquipo(req, res) {
        const { equipo, temporada } = req.params
        const equiposBD = await EquiposModel.devolverEquipos()

        res.send(equiposBD.filter(e => e.nombre == equipo && e.temporada == temporada)[0])
    }
}