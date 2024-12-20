// Función para abrir el modal
function openModal(productId) {
  const modal = document.getElementById('modal');
  const image = document.getElementById('modal-image');
  const name = document.getElementById('modal-name');
  const code = document.getElementById('modal-code');
  const description = document.getElementById('modal-description');

  // Aquí podrías obtener los detalles del producto desde tu catálogo o JSON
  if (productId === 'producto1') {
    image.src = 'producto1.jpg'; // Imagen ampliada
    name.innerText = 'Nombre del Producto 1';
    code.innerText = 'Código: 12345';
    description.innerText = 'Descripción detallada del producto 1.';
  } else if (productId === 'producto2') {
    image.src = 'producto2.jpg';
    name.innerText = 'Nombre del Producto 2';
    code.innerText = 'Código: 67890';
    description.innerText = 'Descripción detallada del producto 2.';
  } else if (productId === 'producto3') {
    image.src = 'producto3.jpg';
    name.innerText = 'Nombre del Producto 3';
    code.innerText = 'Código: 11223';
    description.innerText = 'Descripción detallada del producto 3.';
  }

  modal.style.display = "block";
}

// Función para cerrar el modal
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = "none";
}

