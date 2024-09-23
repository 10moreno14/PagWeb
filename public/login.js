document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            window.location.href = '/inicio'; // Redirigir si es exitoso
        } else {
            alert('Error en el inicio de sesión');
        }
    })
    .catch(error => console.error('Error:', error));
});
