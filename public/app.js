const tablaClientes = document.getElementById('tablaClientes');
const formCliente = document.getElementById('formCliente');

const inputId = document.getElementById('id_cliente');
const inputNombres = document.getElementById('nombres');
const inputApellidos = document.getElementById('apellidos');
const inputTelefono = document.getElementById('telefono');
const inputDireccion = document.getElementById('direccion');

// Cargar clientes al abrir la página
document.addEventListener('DOMContentLoaded', obtenerClientes);

// Obtener clientes
async function obtenerClientes() {
    try {
        const respuesta = await fetch('/api/clientes');
        const clientes = await respuesta.json();

        tablaClientes.innerHTML = '';

        clientes.forEach(cliente => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${cliente.id_cliente}</td>
                <td>${cliente.nombres}</td>
                <td>${cliente.apellidos}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.direccion}</td>
                <td>
                    <button class="editar" 
                        data-id="${cliente.id_cliente}"
                        data-nombres="${cliente.nombres}"
                        data-apellidos="${cliente.apellidos}"
                        data-telefono="${cliente.telefono}"
                        data-direccion="${cliente.direccion}">
                        Editar
                    </button>

                    <button class="eliminar" onclick="eliminarCliente(${cliente.id_cliente})">
                        Eliminar
                    </button>
                </td>
            `;

            const btnEditar = fila.querySelector('.editar');

            btnEditar.addEventListener('click', () => {
                inputId.value = btnEditar.dataset.id;
                inputNombres.value = btnEditar.dataset.nombres;
                inputApellidos.value = btnEditar.dataset.apellidos;
                inputTelefono.value = btnEditar.dataset.telefono;
                inputDireccion.value = btnEditar.dataset.direccion;
            });

            tablaClientes.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al obtener clientes:', error);
    }
}

// Guardar o actualizar
formCliente.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cliente = {
        nombres: inputNombres.value,
        apellidos: inputApellidos.value,
        telefono: inputTelefono.value,
        direccion: inputDireccion.value
    };

    try {
        if (inputId.value) {
            await fetch(`/api/clientes/${inputId.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });
        } else {
            await fetch('/api/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });
        }

        formCliente.reset();
        inputId.value = '';
        obtenerClientes();
    } catch (error) {
        console.error('Error al guardar cliente:', error);
    }
});

// Eliminar cliente
async function eliminarCliente(id) {
    const confirmar = confirm('¿Seguro que deseas eliminar este cliente?');

    if (!confirmar) return;

    try {
        await fetch(`/api/clientes/${id}`, {
            method: 'DELETE'
        });

        obtenerClientes();
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
    }
}