document.getElementById('obtenerClima').addEventListener('click', function() {
    const ciudad = document.getElementById('ciudad').value;
    const apiKey = '6ea2d4affd73101a8de0500e029fc002'; // Reemplaza con tu clave de API
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del clima.');
            }
            return response.json();
        })
        .then(data => {
            const temperatura = data.main.temp;
            const descripcion = data.weather[0].description;
            document.getElementById('resultado').innerHTML = 
                `<div class="alert alert-success" role="alert">
                    El clima en ${ciudad} es ${descripcion} con una temperatura de ${temperatura}°C.
                </div>`;
        })
        .catch(error => {
            document.getElementById('resultado').innerHTML = 
                `<div class="alert alert-danger" role="alert">${error.message}</div>`;
        });
});
