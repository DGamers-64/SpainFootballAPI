import ResultadosModel from "../models/resultados.js"

export default class ResultadosController {
    static async devolverTodosResultados(req, res) {
        const resultados = await ResultadosModel.devolverResultados()
        res.send(resultados)
    }

    static async devolverResultadosDivision(req, res) {
        const { temporada, division } = req.params
        const resultadosBD = await ResultadosModel.devolverResultados()

        res.send(resultadosBD.filter(e => e.temporada == temporada && e.division == division))
    }
    
    static async devolverResultadosDivisionEquipo(req, res) {
        const { temporada, division, equipo } = req.params
        const resultadosBD = await ResultadosModel.devolverResultados()
    
        res.send(resultadosBD.filter(e => e.temporada == temporada && e.division == division && (e.equipo1 == equipo || e.equipo2 == equipo)))
    }
}