// Cargar los productos desde el archivo JSON
let products = [];
fetch('Catalógo.json')
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
         <h3>${product.descripcion}</h3>
         <p>Referencia: ${product.referencia}</p>
         <p>Unidad de Medida: ${product.unidad_de_medida}</p>
         <p>Familia: ${product.familia}</p>
         <p>Almacén: ${product.almacen}</p>
      `;
      productList.appendChild(productDiv);
   });
}

// Función para filtrar los productos
function filterProducts() {
   const name = document.getElementById('search-name').value.toLowerCase();
   const familia = document.getElementById('search-familia').value;
   const almacen = document.getElementById('search-almacen').value;

   const filteredProducts = products.filter(product => {
      const matchesName = product.descripcion.toLowerCase().includes(name);
      const matchesFamilia = familia ? product.familia === familia : true;
      const matchesAlmacen = almacen ? product.almacen === almacen : true;
      
      return matchesName && matchesFamilia && matchesAlmacen;
   });

   displayProducts(filteredProducts); // Mostrar los productos filtrados
}
