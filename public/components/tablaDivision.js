export default function tablaDivision(data) {
    let cambios = data.division.cambiosCategoria
    const total = data.division.equipos

    const ascensoMax = cambios.ascenso?.huecos || 0;
    const playoffMax = (cambios.playoff?.huecos || 0) + ascensoMax;
    const descensoMin = total - (cambios.descenso?.huecos || 0) + 1;

    let elemento = `
    <table class="clasificacion-table">
        <thead>
            <tr>
                <th>Pos</th>
                <th>Equipo</th>
                <th>Pts</th>
                <th>PJ</th>
                <th>PG</th>
                <th>PE</th>
                <th>PP</th>
                <th>GF</th>
                <th>GC</th>
                <th>DG</th>
            </tr>
        </thead>
        <tbody>`

    data.clasificacion.forEach((e, i) => {
        let clase = ""
        const pos = i+1

        if (pos <= ascensoMax) clase = 'class="ascenso"';
        else if (pos <= playoffMax && (cambios.playoff?.huecos || 0) > 0) clase = 'class="playoff"';
        else if (pos >= descensoMin) clase = 'class="descenso"';

        elemento += `
        <tr ${clase}>
            <td class="td-30">${e.posicion}</td>
            <td data-temporada="${data.division.temporada}" data-division="${data.division.nombre}" data-equipo="${e.nombre}"><div class="td-flex"><img src="${e.urlEscudo}">${e.nombre}</div></td>
            <td class="td-30">${e.pts}</td>
            <td class="td-30">${e.pj}</td>
            <td class="td-30">${e.pg}</td>
            <td class="td-30">${e.pe}</td>
            <td class="td-30">${e.pp}</td>
            <td class="td-30">${e.gf}</td>
            <td class="td-30">${e.gc}</td>
            <td class="td-30">${e.dg}</td>
        </tr>
        `
    })

    elemento += `
        </tbody>     
    </table>
    `

    return elemento
}