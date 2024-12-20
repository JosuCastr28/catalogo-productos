// Carga el archivo JSON y genera los productos
fetch('productos.json')
  .then(response => response.json())
  .then(data => {
    const productGrid = document.getElementById('product-grid');
    data.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
        <img src="${product.imagen}" alt="${product.producto}" onclick="openModal('${product.codigo}')">
        <p>${product.producto}</p>
      `;
      productGrid.appendChild(productDiv);
    });

    // Guarda los productos en memoria para el modal
    window.productData = data;
  });

// Abre el modal con los detalles del producto
function openModal(codigo) {
  const modal = document.getElementById('modal');
  const image = document.getElementById('modal-image');
  const name = document.getElementById('modal-name');
  const code = document.getElementById('modal-code');
  const category = document.getElementById('modal-category');
  const unit = document.getElementById('modal-unit');

  const product = window.productData.find(p => p.codigo === codigo);

  if (product) {
    image.src = product.imagen;
    name.innerText = `Nombre: ${product.producto}`;
    code.innerText = `Código: ${product.codigo}`;
    category.innerText = `Categoría: ${product.categoria}`;
    unit.innerText = `Unidad: ${product.unidad}`;
  }

  modal.style.display = "block";
}

// Cierra el modal
function closeModal() {
  document.getElementById('modal').style.display = "none";
}

// Cierra el modal si se hace clic fuera de él
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    modal.style.display = "none";
  }
};


