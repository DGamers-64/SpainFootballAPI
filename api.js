import express from "express";
import { apiv1Router } from "./routers/apiv1.js";

const app = express()
const PORT = process.env.PORT || 6123

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use("/api/v1", apiv1Router)

app.listen(PORT, () => {
    const log = [
        `-----------------------------------------------`,
        `               SpainFootballAPI`,
        `Servidor levantado en http://localhost:${PORT}`,
        `-----------------------------------------------`
    ].join("\n")

    console.log(log)
})