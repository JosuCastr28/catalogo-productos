// Ruta al archivo JSON
const jsonFilePath = 'Catalógo.json';

// Elementos del DOM
const productGrid = document.getElementById('product-grid');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalName = document.getElementById('modal-name');
const modalCode = document.getElementById('modal-code-text');
const modalCategory = document.getElementById('modal-category-text');
const modalUnit = document.getElementById('modal-unit-text');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');

// Cargar productos desde el archivo JSON
fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo JSON.');
    }
    return response.json();
  })
  .then(data => {
    window.productData = data;
    renderProducts(data);  // Muestra todos los productos
  })
  .catch(error => console.error('Error al cargar el JSON:', error));

// Función para renderizar los productos en el grid
function renderProducts(products) {
  productGrid.innerHTML = '';
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${product.imagen}" alt="${product.producto}" onclick="openModal('${product.codigo}')">
      <p>${product.producto}</p>
    `;
    productGrid.appendChild(productDiv);
  });
}

// Abre el modal con los detalles del producto
function openModal(codigo) {
  const product = window.productData.find(p => p.codigo === codigo);

  if (product) {
    modalImage.src = product.imagen;
    modalName.innerText = product.producto;
    modalCode.innerText = product.codigo;
    modalCategory.innerText = product.categoria;
    modalUnit.innerText = product.unidad;
    modal.style.display = 'block';
  }
}

// Cierra el modal
function closeModal() {
  modal.style.display = 'none';
}

// Cierra el modal si se hace clic fuera de él
window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
};

// Función para filtrar productos por búsqueda y categoría
function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredProducts = window.productData.filter(product => {
    const matchesSearch = product.producto.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory ? product.categoria === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  renderProducts(filteredProducts);
}
