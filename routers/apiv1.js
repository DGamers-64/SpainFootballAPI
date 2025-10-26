import { Router } from "express"
import ClasificacionController from "../controllers/clasificacion.js"
import DivisionesController from "../controllers/division.js"
import EquiposController from "../controllers/equipo.js"
import ResultadosController from "../controllers/resultado.js"

export const apiv1Router = Router({ mergeParams: true })

apiv1Router.get("/division", DivisionesController.devolverTodasDivisiones)

apiv1Router.get("/division/:temporada/:division", DivisionesController.devolverDivision)

apiv1Router.get("/equipo", EquiposController.devolverTodosEquipos)

apiv1Router.get("/equipo/:temporada/:equipo", EquiposController.devolverEquipo)

apiv1Router.get("/resultado", ResultadosController.devolverTodosResultados)

apiv1Router.get("/clasificacion/:temporada/:division", ClasificacionController.generarClasificacion)