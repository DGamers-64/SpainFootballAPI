import DivisionesModel from "../models/divisiones.js"
import EquiposModel from "../models/equipos.js"
import ResultadosModel from "../models/resultados.js"

export default class ClasificacionController {
    static async generarClasificacion(req, res) {
        const clasificacion = []
        const { temporada, division } = req.params

        let divisionInfo = await DivisionesModel.devolverDivisiones()
        let resultados = await ResultadosModel.devolverResultados()
        let equipos = await EquiposModel.devolverEquipos()

        divisionInfo = divisionInfo.filter(e => e.nombre == division)[0]
        resultados = resultados.filter(e => e.division == division && e.temporada == temporada)
        equipos = equipos.filter(e => 
            e.competiciones.includes(division) && e.temporada == temporada
        )

        equipos.forEach(e => {
            const resultadosEquipo = resultados.filter(r => r.equipo1 == e.nombre || r.equipo2 == e.nombre)

            const hC = {
                posicion: 1,
                urlEscudo: e.urlEscudo,
                nombre: e.nombre,
                pj: 0,
                pg: 0,
                pe: 0,
                pp: 0,
                gf: 0,
                gc: 0,
                dg: 0,
                pts: 0
            }

            resultadosEquipo.forEach(r => {
                hC.pj++
                if (r.equipo1 == e.nombre) {
                    hC.gf += r.goles1
                    hC.gc += r.goles2
                    if (r.goles1 > r.goles2) {
                        hC.pg++
                        hC.pts += divisionInfo.puntaje.victoria
                    } else if (r.goles1 < r.goles2) {
                        hC.pp++
                        hC.pts += divisionInfo.puntaje.derrota
                    } else {
                        hC.pe++
                        hC.pts += divisionInfo.puntaje.empate
                    }
                } else {
                    hC.gf += r.goles2
                    hC.gc += r.goles1
                    if (r.goles2 > r.goles1) {
                        hC.pg++
                        hC.pts += divisionInfo.puntaje.victoria
                    } else if (r.goles2 < r.goles1) {
                        hC.pp++
                        hC.pts += divisionInfo.puntaje.derrota
                    } else {
                        hC.pe++
                        hC.pts += divisionInfo.puntaje.empate
                    }
                }

                hC.dg = hC.gf - hC.gc
            })

            clasificacion.push(hC)
        })

        clasificacion.sort((a, b) => {
            if (b.pts !== a.pts) {
                return b.pts - a.pts
            }

            return b.dg - a.dg
        })

        clasificacion.forEach((e, i) => {
            e.posicion = i + 1
        })

        res.send(clasificacion)
    }
}