import fs from "fs/promises";

export default class DivisionesModel {
    static async devolverDivisiones() {
        const divisiones = await fs.readFile("./data/competiciones.json")
        return JSON.parse(divisiones)
    }
}