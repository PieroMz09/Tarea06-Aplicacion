let page = 1;
const limit = 10;
let idParaEliminar = null;

const urlParams = new URLSearchParams(window.location.search);
const urlPage = urlParams.get('page');
if (urlPage && !isNaN(parseInt(urlPage)) && parseInt(urlPage) >= 1) {
    page = parseInt(urlPage);
}

function updateNuevoDistritoLink() {
    const container = document.getElementById('nuevo-distrito-container');
    if (container) {
        container.innerHTML = `<a href="nuevo.html?page=${page}" class="btn btn-success">Nuevo Distrito</a>`;
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('d-none');
    setTimeout(() => {
        toast.classList.add('d-none');
    }, 3000);
}

async function cargar() {
    const search = document.getElementById('search').value;
    const tabla = document.getElementById('tabla');

    tabla.classList.add('fade-out');

    try {
        await new Promise(resolve => setTimeout(resolve, 300));

        const res = await fetch(`/api/distritos?page=${page}&limit=${limit}&search=${search}`);
        if (!res.ok) throw new Error('Error en el servidor');
        const data = await res.json();

        if (page > data.totalPages && data.totalPages > 0) {
            page = 1;
            return cargar();
        }

        renderTabla(data.data);
        renderPaginacion(data.totalPages);
        updateNuevoDistritoLink();

        tabla.classList.remove('fade-out');
    } catch (error) {
        alert('Error al cargar datos: ' + error.message);
        console.error(error);
        tabla.classList.remove('fade-out');
    }
}

function renderTabla(datos) {
    const tabla = document.getElementById('tabla');
    tabla.innerHTML = '';

    if (datos.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted py-4">
                    No se encontraron resultados
                </td>
            </tr>
        `;
        return;
    }

    datos.forEach((d, index) => {
        const poblacion = d.poblacion ? d.poblacion.toLocaleString() : 'N/A';
        tabla.innerHTML += `
            <tr class="table-row-animate" style="animation-delay: ${index * 0.05}s">
                <td>${d.id_dis}</td>
                <td>${d.nom_dis}</td>
                <td>${d.cod_postal}</td>
                <td>${poblacion}</td>
                <td>
                    <a href="edit.html?id=${d.id_dis}&page=${page}" class="btn btn-warning btn-sm">Editar</a>
                    <button onclick="eliminar(${d.id_dis})" class="btn btn-danger btn-sm">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function renderPaginacion(totalPages) {
    const div = document.getElementById('paginacion');
    div.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === page ? 'btn-primary' : 'btn-outline-primary';
        div.innerHTML += `<button onclick="irPagina(${i})" class="btn ${activeClass} btn-sm">${i}</button>`;
    }
}

function irPagina(p) {
    page = p;
    cargar();
}

function eliminar(id_dis) {
    idParaEliminar = id_dis;
    const modal = new bootstrap.Modal(document.getElementById('modalEliminar'));
    modal.show();
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('created') === 'true') {
        showToast('¡Distrito creado correctamente!');
        urlParams.delete('created');
        window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    }
    
    if (urlParams.get('updated') === 'true') {
        showToast('¡Distrito actualizado correctamente!');
        urlParams.delete('updated');
        window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    }

    document.getElementById('btnConfirmarEliminar').addEventListener('click', async () => {
        if (idParaEliminar) {
            try {
                const res = await fetch(`/api/distritos/${idParaEliminar}`, {
                    method: 'DELETE'
                });
                if (!res.ok) throw new Error('Error al eliminar');
                
                idParaEliminar = null;
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalEliminar'));
                modal.hide();
                cargar();
                showToast('¡Distrito eliminado correctamente!');
            } catch (error) {
                alert('Error al eliminar: ' + error.message);
            }
        }
    });
});

cargar();
