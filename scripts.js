document.getElementById('form-register').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = this.elements[0].value;
    const email = this.elements[1].value;
    const password = this.elements[2].value;

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, email, password })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('form-login').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = this.elements[0].value;
    const password = this.elements[1].value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'loterias.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Cargar loterías
fetch('/data/loterias.json')
    .then(response => response.json())
    .then(data => {
        const loteriasList = document.getElementById('loterias-list');
        data.forEach(loteria => {
            const div = document.createElement('div');
            div.innerHTML = `<h3>${loteria.nombre}</h3><p>${loteria.descripcion}</p><a href="compra.html?id=${loteria.id}">Comprar</a>`;
            loteriasList.appendChild(div);
        });
    });
// Código para la compra de loterías
document.getElementById('form-compra').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const loteriaId = document.getElementById('loteria-id').value;
    const numero = this.elements[0].value;
    const cantidad = this.elements[1].value;

    fetch('/api/comprar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ loteriaId, numero, cantidad })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
router.post('/comprar', async (req, res) => {
    const { loteriaId, numero, cantidad } = req.body;
    
    // Aquí podrías agregar lógica para guardar la compra en la base de datos
    // Para simplicidad, solo enviaremos una respuesta exitosa
    res.status(200).json({ message: 'Compra realizada con éxito.' });
});
document.getElementById('form-recuperar').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.elements[0].value;

    fetch('/api/recuperar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
// Simulación de la llamada a una API de Loterías
async function obtenerLoterias() {
    try {
        // Reemplazar con el endpoint de la API oficial cuando esté disponible
        const response = await fetch('https://api.simulada.com/loterias'); // Cambia por la API oficial
        const data = await response.json();  // Datos JSON devueltos por la API
        return data;  // Ajusta según el formato de la API real
    } catch (error) {
        console.error("Error al obtener las loterías:", error);
        return [
            { nombre: "Euromillones", descripcion: "Sorteo de martes y viernes" },
            { nombre: "La Primitiva", descripcion: "Sorteo de jueves y sábado" },
            { nombre: "El Gordo de la Primitiva", descripcion: "Sorteo de domingo" }
        ];  // Datos de ejemplo en caso de error
    }
}

// Función para mostrar las loterías
async function mostrarLoterias() {
    const listaLoterias = document.getElementById('loterias-list');
    const loterias = await obtenerLoterias();

    loterias.forEach(loteria => {
        const loteriaDiv = document.createElement('div');
        loteriaDiv.classList.add('loteria-item');
        
        const nombreLoteria = document.createElement('h3');
        nombreLoteria.textContent = loteria.nombre;

        const descripcionLoteria = document.createElement('p');
        descripcionLoteria.textContent = loteria.descripcion;

        loteriaDiv.appendChild(nombreLoteria);
        loteriaDiv.appendChild(descripcionLoteria);

        listaLoterias.appendChild(loteriaDiv);
    });
}

// Llamada inicial cuando la página carga
document.addEventListener('DOMContentLoaded', mostrarLoterias);
