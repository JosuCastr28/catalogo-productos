const jsonFilePath = 'Catalógo.json'; // Cambiado según tu archivo

// Elementos del DOM
const productosContainer = document.getElementById('productos');
const busquedaInput = document.getElementById('busqueda');
const filtroSelect = document.getElementById('filtro');
const btnBuscar = document.getElementById('btnBuscar');

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

// Mostrar productos en la página
function mostrarProductos(productos) {
  productosContainer.innerHTML = '';
  productos.forEach(producto => {
    const productoHTML = `
      <div class="producto">
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

// Cargar categorías en el filtro desplegable
function cargarCategorias(productos) {
  const categorias = [...new Set(productos.map(producto => producto.categoria))];
  categorias.forEach(categoria => {
    const option = document.createElement('option');
    option.value = categoria;
    option.textContent = categoria;
    filtroSelect.appendChild(option);
  });
}

// Filtrar productos por búsqueda y categoría
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

// Evento de búsqueda y filtro
btnBuscar.addEventListener('click', async () => {
  const response = await fetch(jsonFilePath);
  const productos = await response.json();
  filtrarProductos(productos);
});

// Inicializar
cargarProductos();
