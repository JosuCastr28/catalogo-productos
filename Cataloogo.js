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
         <img src="imagenes/${product.imagen}" alt="${product.descripcion}" class="product-image">
      `;
      productList.appendChild(productDiv);
   });
}
