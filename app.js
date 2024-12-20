let productos = [];
let categorias = new Set();

// Cargar productos desde el archivo JSON
fetch('Catalógo.json')
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
        cargarCategorias(productos);
    })
    .catch(error => console.error('Error cargando los productos:', error));

// Cargar categorías para el filtro
function cargarCategorias(productos) {
    const categoryFilter = document.getElementById('categoryFilter');
    productos.forEach(producto => categorias.add(producto.categoria));
    
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        categoryFilter.appendChild(option);
    });
}

// Mostrar productos en cuadrícula
function cargarProductos(productos) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';  // Limpiar antes de cargar productos
    
    productos.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.onclick = () => openModal(producto);
        
        productCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.producto}">
            <h3>${producto.producto}</h3>
            <p><strong>Código:</strong> ${producto.codigo}</p>
            <p><strong>Categoría:</strong> ${producto.categoria}</p>
            <p><strong>Unidad:</strong> ${producto.unidad}</p>
        `;
        
        productGrid.appendChild(productCard);
    });
}

// Función de búsqueda
function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    const filteredProducts = productos.filter(producto => {
        const matchesSearch = producto.producto.toLowerCase().includes(searchInput) ||
                              producto.codigo.toLowerCase().includes(searchInput) ||
                              producto.categoria.toLowerCase().includes(searchInput);
        const matchesCategory = categoryFilter ? producto.categoria === categoryFilter : true;
        return matchesSearch && matchesCategory;
    });
    
    cargarProductos(filteredProducts);
}

// Abrir la ventana modal
function openModal(producto) {
    document.getElementById('modalProductName').textContent = producto.producto;
    document.getElementById('modalProductCode').textContent = producto.codigo;
    document.getElementById('modalProductCategory').textContent = producto.categoria;
    document.getElementById('modalProductUnit').textContent = producto.unidad;
    document.getElementById('modalProductImage').src = producto.imagen;
    
    document.getElementById('productModal').style.display = 'flex';
}

// Cerrar la ventana modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}
