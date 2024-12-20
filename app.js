// Ruta al archivo JSON
const jsonFilePath = 'Catalógo.json';

// Elementos del DOM
const productGrid = document.getElementById('product-grid');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalName = document.getElementById('modal-name');
const modalCode = document.getElementById('modal-code');
const modalCategory = document.getElementById('modal-category');
const modalUnit = document.getElementById('modal-unit');

// Función para cargar productos desde el archivo JSON
fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo JSON.');
    }
    return response.json();
  })
  .then(data => {
    data.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
        <img src="${product.imagen}" alt="${product.producto}" onclick="openModal('${product.codigo}')">
        <p>${product.producto}</p>
      `;
      productGrid.appendChild(productDiv);
    });

    // Guarda los productos para acceso posterior
    window.productData = data;
  })
  .catch(error => console.error('Error al cargar el JSON:', error));

// Abre el modal con los detalles del producto
function openModal(codigo) {
  const product = window.productData.find(p => p.codigo === codigo);

  if (product) {
    modalImage.src = product.imagen;
    modalName.innerText = `Nombre: ${product.producto}`;
    modalCode.innerText = `Código: ${product.codigo}`;
    modalCategory.innerText = `Categoría: ${product.categoria}`;
    modalUnit.innerText = `Unidad: ${product.unidad}`;
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
