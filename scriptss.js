// Simulación de datos - puedes cambiar esta función por una API real
async function obtenerLoterias() {
    return [
        { nombre: "Euromillones", descripcion: "Sorteo martes y viernes" },
        { nombre: "Primitiva", descripcion: "Sorteo jueves y sábado" },
        { nombre: "Bonoloto", descripcion: "Sorteo diario" }
    ];
}

async function obtenerResultados() {
    return [
        { loteria: "Euromillones", resultado: "05, 10, 12, 25, 30 - Estrellas: 01, 07" },
        { loteria: "Primitiva", resultado: "07, 13, 24, 32, 38, 49 - Complementario: 19" },
        { loteria: "Bonoloto", resultado: "03, 14, 18, 29, 36, 45 - Complementario: 27" }
    ];
}

// Mostrar las loterías disponibles
async function mostrarLoterias() {
    const loterias = await obtenerLoterias();
    const listaLoterias = document.getElementById('loterias-list');
    
    loterias.forEach(loteria => {
        const divLoteria = document.createElement('div');
        divLoteria.classList.add('loteria');
        divLoteria.innerHTML = `<h3>${loteria.nombre}</h3><p>${loteria.descripcion}</p>`;
        listaLoterias.appendChild(divLoteria);
    });
}

// Mostrar los últimos resultados
async function mostrarResultados() {
    const resultados = await obtenerResultados();
    const listaResultados = document.getElementById('resultados-list');
    
    resultados.forEach(resultado => {
        const divResultado = document.createElement('div');
        divResultado.classList.add('resultado');
        divResultado.innerHTML = `<h3>${resultado.loteria}</h3><p>${resultado.resultado}</p>`;
        listaResultados.appendChild(divResultado);
    });
}

// Ejecutar las funciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarLoterias();
    mostrarResultados();
});
