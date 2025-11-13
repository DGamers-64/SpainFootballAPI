import ResultadosModel from "../models/resultados.js"

export default class ResultadosController {
    static async devolverTodosResultados(req, res) {
        const resultados = await ResultadosModel.devolverResultados()
        res.send(resultados)
    }

    static async devolverResultadosDivision(req, res) {
        const { equipo1, equipo2 } = req.params
        const resultadosBD = await ResultadosModel.devolverResultados()

        res.send(resultadosBD.filter(e => e.equipo1 == equipo1 && e.equipo2 == equipo2))
    }
    
    static async devolverResultadosDivisionEquipo(req, res) {
        const { temporada, division, equipo } = req.params
        const resultadosBD = await ResultadosModel.devolverResultados()
    
        res.send(resultadosBD.filter(e => e.temporada == temporada && e.division == division && (e.equipo1 == equipo || e.equipo2 == equipo)))
    }

    static async nuevoResultado(req, res) {
        const { equipo1, equipo2, division, goles1, goles2, fecha } = req.body
        const resultado = {
            equipo1,
            equipo2,
            tipo: "liga",
            division,
            temporada: "25-26",
            goles1,
            goles2,
            fecha
        }

        await ResultadosModel.nuevoResultado(resultado)

        res.send(resultado)
    }
}