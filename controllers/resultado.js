import ResultadosModel from "../models/resultados.js"

export default class ResultadosController {
    static async devolverTodosResultados(req, res) {
        const resultados = await ResultadosModel.devolverResultados()
        res.send(resultados)
    }
}