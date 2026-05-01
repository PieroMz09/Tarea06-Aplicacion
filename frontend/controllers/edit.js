const urlParams = new URLSearchParams(window.location.search);
const id_dis = urlParams.get('id');
const returnPage = urlParams.get('page') || '1';

async function cargarDistrito() {
    const res = await fetch(`/api/distritos/${id_dis}`);
    const distrito = await res.json();

    document.getElementById('id_dis').value = distrito.id_dis;
    document.getElementById('nom_dis').value = distrito.nom_dis;
    document.getElementById('cod_postal').value = distrito.cod_postal;
    document.getElementById('poblacion').value = distrito.poblacion || '';
}

document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const modalElement = document.getElementById('modalGuardando');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();

    const id_dis = document.getElementById('id_dis').value;
    const nom_dis = document.getElementById('nom_dis').value;
    const cod_postal = document.getElementById('cod_postal').value;
    const poblacionValue = document.getElementById('poblacion').value;
    const poblacion = poblacionValue ? parseInt(poblacionValue) : null;

    try {
        const res = await fetch(`/api/distritos/${id_dis}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom_dis, cod_postal, poblacion })
        });

        if (!res.ok) throw new Error('Error al actualizar');

        await new Promise(resolve => setTimeout(resolve, 2000));
        window.location.href = `index.html?page=${returnPage}&updated=true`;
    } catch (error) {
        modal.hide();
        alert('Error al guardar: ' + error.message);
    }
});

document.getElementById('btnCancelar').addEventListener('click', () => {
    window.location.href = `index.html?page=${returnPage}`;
});

cargarDistrito();
