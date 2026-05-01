const urlParams = new URLSearchParams(window.location.search);
const returnPage = urlParams.get('page') || '1';

document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nom_dis = document.getElementById('nom_dis').value;
    const cod_postal = document.getElementById('cod_postal').value;
    const poblacionValue = document.getElementById('poblacion').value;
    const poblacion = poblacionValue ? parseInt(poblacionValue) : null;

    await fetch('/api/distritos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom_dis, cod_postal, poblacion })
    });

    window.location.href = `index.html?page=${returnPage}&created=true`;
});

document.getElementById('btnCancelarNuevo').addEventListener('click', () => {
    window.location.href = `index.html?page=${returnPage}`;
});
