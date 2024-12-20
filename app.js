const jsonFilePath = 'Catalógo.json';

// Elementos del DOM
const productosContainer = document.getElementById('productos');
const busquedaInput = document.getElementById('busqueda');
const filtroSelect = document.getElementById('filtro');
const btnBuscar = document.getElementById('btnBuscar');
const modal = document.getElementById('modal');
const modalImagen = document.getElementById('modal-imagen');
const modalNombre = document.getElementById('modal-nombre');
const modalCodigo = document.getElementById('modal-codigo');
const modalCategoria = document.getElementById('modal-categoria');
const modalUnidad = document.getElementById('modal-unidad');

// Cargar productos desde JSON
async function cargarProductos() {
  try {
    const response = await fetch(jsonFilePath);
    const productos = await response.json();
    mostrarProductos(productos);
    cargarCategorias(productos);
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}

// Mostrar productos
function mostrarProductos(productos) {
  productosContainer.innerHTML = '';
  productos.forEach(producto => {
    const productoHTML = `
      <div class="producto" onclick="abrirModal('${producto.imagen}', '${producto.producto}', '${producto.codigo}', '${producto.categoria}', '${producto.unidad}')">
        <img src="${producto.imagen}" alt="${producto.producto}">
        <h3>${producto.producto}</h3>
        <p>Código: ${producto.codigo}</p>
        <p>Categoría: ${producto.categoria}</p>
        <p>Unidad: ${producto.unidad}</p>
      </div>
    `;
    productosContainer.innerHTML += productoHTML;
  });
}

// Cargar categorías
function cargarCategorias(productos) {
  const categorias = [...new Set(productos.map(producto => producto.categoria))];
  categorias.forEach(categoria => {
    const option = document.createElement('option');
    option.value = categoria;
    option.textContent = categoria;
    filtroSelect.appendChild(option);
  });
}

// Filtrar productos
function filtrarProductos(productos) {
  const textoBusqueda = busquedaInput.value.toLowerCase();
  const categoriaSeleccionada = filtroSelect.value;

  const productosFiltrados = productos.filter(producto => {
    const coincideBusqueda = producto.producto.toLowerCase().includes(textoBusqueda);
    const coincideCategoria = categoriaSeleccionada === '' || producto.categoria === categoriaSeleccionada;
    return coincideBusqueda && coincideCategoria;
  });

  mostrarProductos(productosFiltrados);
}

// Modal
function abrirModal(imagen, nombre, codigo, categoria, unidad) {
  modalImagen.src = imagen;
  modalNombre.textContent = `Producto: ${nombre}`;
  modalCodigo.textContent = `Código: ${codigo}`;
  modalCategoria.textContent = `Categoría: ${categoria}`;
  modalUnidad.textContent = `Unidad: ${unidad}`;
  modal.style.display = 'flex';
}

function cerrarModal() {
  modal.style.display = 'none';
}

// Eventos
btnBuscar.addEventListener('click', async () => {
  const response = await fetch(jsonFilePath);
  const productos = await response.json();
  filtrarProductos(productos);
});

// Inicializar
cargarProductos();
