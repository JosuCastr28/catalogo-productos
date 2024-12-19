let products = [];

// Cargar los productos desde el archivo JSON
fetch('https://raw.githubusercontent.com/JosuCastr28/catalogo-productos/main/Catalógo.json')
   .then(response => response.json())
   .then(data => {
      products = data;
      displayProducts(products); // Mostrar todos los productos al cargar
   })
   .catch(error => console.error('Error al cargar los productos:', error));

// Función para mostrar los productos en el HTML
function displayProducts(products) {
   const productList = document.getElementById('product-list');
   productList.innerHTML = ''; // Limpiar el contenedor antes de mostrar los productos

   products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
         <h3>${product.producto}</h3>
         <p>Código: ${product.codigo}</p>
         <p>Categoría: ${product.categoria}</p>
         <p>Unidad: ${product.unidad}</p>
         <img src="${product.imagen}" alt="${product.producto}" class="product-image">
      `;
      productList.appendChild(productDiv);
   });
}

// Función para filtrar productos según el nombre o la familia
function filterProducts() {
   const nameFilter = document.getElementById('search-name').value.toLowerCase();
   const familiaFilter = document.getElementById('search-familia').value.toLowerCase();

   const filteredProducts = products.filter(product => {
      return (product.producto.toLowerCase().includes(nameFilter) || nameFilter === '') &&
             (product.categoria.toLowerCase().includes(familiaFilter) || familiaFilter === '');
   });

   displayProducts(filteredProducts); // Mostrar los productos filtrados
}
