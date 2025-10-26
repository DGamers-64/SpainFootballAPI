import fs from "fs/promises";

export default class ResultadosModel {
    static async devolverResultados() {
        const resultados = await fs.readFile("./data/resultados.json")
        return JSON.parse(resultados)
    }
}