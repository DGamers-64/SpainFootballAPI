export default function tablaCruzada(data) {
    let tabla = `
        <table class="cruzada-table">
            <tr>
                <td class="equipo-celda"></td>`

    const equiposSort = data.equipos.sort((a, b) => a.nombre.localeCompare(b.nombre))

    equiposSort.forEach(e => {
        tabla += `<td class="equipo-celda">${e.abreviacion}</td>`
    });

    
    equiposSort.forEach(e => {
        tabla += `</tr>`
        tabla += `<td class="equipo-celda">${e.abreviacion}</td>`

        const resultadosLocal = data.resultados.filter(r => r.equipo1 == e.nombre).sort((a, b) => a.equipo2.localeCompare(b.equipo2))

        const encuentrosCompletados = resultadosLocal.map(r => r.equipo2)

        equiposSort.forEach(eqVis => {
            if (encuentrosCompletados.includes(eqVis.nombre)) {
                const goles = `${resultadosLocal.find(r => r.equipo2 == eqVis.nombre).goles1}-${resultadosLocal.find(r => r.equipo2 == eqVis.nombre).goles2}`

                tabla += `<td>${goles}</td>`
            } else if (eqVis.nombre == e.nombre) {
                tabla += `<td class="mismo-equipo"></td>`
            } else {
                tabla += `<td></td>`
            }
        })
        tabla += `</tr>`
    })

    tabla += `</table>`

    return tabla
}