import fs from "fs/promises";

export default class EquiposModel {
    static async devolverEquipos() {
        const equipos = await fs.readFile("./data/equipos.json")
        return JSON.parse(equipos)
    }

    static async insertarEquipo(equipo) {
        const equipos = await this.devolverEquipos()
        equipos.push(equipo)
        await fs.writeFile("./data/equipos.json", equipos)
        return JSON.parse(equipo)
    }
}