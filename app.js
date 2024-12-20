// Cargar productos desde el JSON
const productos = [];

// Obtener los productos desde el JSON
fetch('Catalógo.json')
    .then(response => response.json())
    .then(data => {
        productos.push(...data);
        cargarProductos(productos);
        cargarCategorias(productos);
    })
    .catch(error => console.error('Error cargando los productos:', error));

// Cargar productos en la cuadrícula
function cargarProductos(productos) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = ''; // Limpiar la cuadrícula

    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.producto}" onclick="abrirModal('${producto.imagen}', '${producto.producto}', '${producto.codigo}', '${producto.categoria}', '${producto.unidad}')">
            <h3>${producto.producto}</h3>
            <p><strong>Código:</strong> ${producto.codigo}</p>
            <p><strong>Categoría:</strong> ${producto.categoria}</p>
            <p><strong>Unidad:</strong> ${producto.unidad}</p>
        `;
        productGrid.appendChild(div);
    });
}

// Cargar las categorías en el filtro
function cargarCategorias(productos) {
    const categories = new Set(productos.map(producto => producto.categoria));
    const filterCategory = document.getElementById('filterCategory');

    categories.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        filterCategory.appendChild(option);
    });
}

// Buscar productos por nombre, código o categoría
function buscarProductos() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filterCategory = document.getElementById('filterCategory').value;
    const productosFiltrados = productos.filter(producto => {
        const matchesSearch = producto.producto.toLowerCase().includes(searchInput) ||
                              producto.codigo.toLowerCase().includes(searchInput) ||
                              producto.categoria.toLowerCase().includes(searchInput);
        const matchesCategory = filterCategory ? producto.categoria === filterCategory : true;
        return matchesSearch && matchesCategory;
    });
    cargarProductos(productosFiltrados);
}

// Mostrar la ventana modal
function abrirModal(imagen, nombre, codigo, categoria, unidad) {
    const modal = document.getElementById('modal');
    const modalImagen = document.getElementById('modal-imagen');
    const modalNombre = document.getElementById('modal-nombre');
    const modalCodigo = document.getElementById('modal-codigo');
    const modalCategoria = document.getElementById('modal-categoria');
    const modalUnidad = document.getElementById('modal-unidad');

    // Asignar datos al modal
    modalImagen.src = imagen;
    modalNombre.textContent = `Producto: ${nombre}`;
    modalCodigo.textContent = `Código: ${codigo}`;
    modalCategoria.textContent = `Categoría: ${categoria}`;
    modalUnidad.textContent = `Unidad: ${unidad}`;

    // Mostrar modal
    modal.style.display = 'flex';
}

// Cerrar la ventana modal
function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}
