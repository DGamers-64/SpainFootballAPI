import fs from "fs/promises";

export default class ResultadosModel {
    static async devolverResultados() {
        const resultados = await fs.readFile("./data/resultados.json", "utf-8")
        return JSON.parse(resultados)
    }

    static async nuevoResultado(resultado) {
        const resultados = await this.devolverResultados()
        resultados.push(resultado)
        await fs.writeFile("./data/resultados.json", JSON.stringify(resultados, null, 4))
    }
}