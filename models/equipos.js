import fs from "fs/promises";

export default class EquiposModel {
    static async devolverEquipos() {
        const equipos = await fs.readFile("./data/equipos.json")
        return JSON.parse(equipos)
    }
}