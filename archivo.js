document.getElementById('ciudad').addEventListener('keyup', function() {
    const ciudad = document.getElementById('ciudad').value;
    const apiKey = '6ea2d4affd73101a8de0500e029fc002'; // mi clave API generada
    const url = `https://api.openweathermap.org/data/2.5/find?q=${ciudad}&appid=${apiKey}&units=metric`;

    if (ciudad.length > 0) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del clima.');
                }
                return response.json();
            })
            .then(data => {
                const sugerencias = data.list;
                const sugerenciasHTML = sugerencias.map(sugerencia => {
                    return `<li class="list-group-item" data-name="${sugerencia.name}" data-id="${sugerencia.id}">${sugerencia.name}</li>`;
                }).join('');
                document.getElementById('sugerencias').innerHTML = sugerenciasHTML;
            })
            .catch(error => {
                document.getElementById('sugerencias').innerHTML = '';
            });
    } else {
        document.getElementById('sugerencias').innerHTML = '';
    }
});

document.getElementById('sugerencias').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        const ciudad = event.target.dataset.name;
        document.getElementById('ciudad').value = ciudad;
        obtenerClima(ciudad);
        document.getElementById('sugerencias').innerHTML = '';
    }
});

document.getElementById('obtenerClima').addEventListener('click', function() {
    const ciudad = document.getElementById('ciudad').value;
    if (ciudad) {
        obtenerClima(ciudad);
    }
});

function obtenerClima(ciudad) {
    const apiKey = '6ea2d4affd73101a8de0500e029fc002'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del clima.');
            }
            return response.json();
        })
        .then(data => {
            mostrarResultado(data);
        })
        .catch(error => {
            document.getElementById('resultado').innerHTML = '<div class="alert alert-danger">Ciudad no encontrada. Intenta nuevamente.</div>';
        });
}

function mostrarResultado(data) {
    const nombreCiudad = data.name;
    const temperatura = data.main.temp;
    const clima = data.weather[0].description;
    const icono = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    document.getElementById('resultado').innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${nombreCiudad}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${clima}</h6>
                <img src="${icono}" alt="Icono del clima">
                <p class="card-text">Temperatura: ${temperatura} °C</p>
            </div>
        </div>
    `;
}