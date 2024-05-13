const products = [
    {
      name: 'Sony Playstation 5',
      url: 'img/playstation_5.png',
      category: 'games',
      price: 499.99,
    },
    {
      name: 'Samsung Galaxy',
      url: 'img/samsung_galaxy.png',
      category: 'smartphones',
      price: 399.99,
    },
    {
      name: 'Cannon EOS Camera',
      url: 'img/cannon_eos_camera.png',
      category: 'cameras',
      price: 749.99,
    },
    {
      name: 'Sony A7 Camera',
      url: 'img/sony_a7_camera.png',
      category: 'cameras',
      price: 1999.99,
    },
    {
      name: 'LG TV',
      url: 'img/lg_tv.png',
      category: 'televisions',
      price: 799.99,
    },
    {
      name: 'Nintendo Switch',
      url: 'img/nintendo_switch.png',
      category: 'games',
      price: 299.99,
    },
    {
      name: 'Xbox Series X',
      url: 'img/xbox_series_x.png',
      category: 'games',
      price: 499.99,
    },
    {
      name: 'Samsung TV',
      url: 'img/samsung_tv.png',
      category: 'televisions',
      price: 1099.99,
    },
    {
      name: 'Google Pixel',
      url: 'img/google_pixel.png',
      category: 'smartphones',
      price: 499.99,
    },
    {
      name: 'Sony ZV1F Camera',
      url: 'img/sony_zv1f_camera.png',
      category: 'cameras',
      price: 799.99,
    },
    {
      name: 'Toshiba TV',
      url: 'img/toshiba_tv.png',
      category: 'televisions',
      price: 499.99,
    },
    {
      name: 'iPhone 14',
      url: 'img/iphone_14.png',
      category: 'smartphones',
      price: 999.99,
    },
  ];

  //Select DOM Elements
  const productsWrapper = document.getElementById('products-wrapper')
  const checkboxes = document.querySelectorAll('.check');
  const filtersContainer = document.getElementById('filters-container');
  const searchInput = document.getElementById('search');
  const cartCount = document.getElementById('cart-count');

//Init cart item count
let cartItemCount = 0;

//Init product element array 
const productElements = [];

// Event listeners for filtering
filtersContainer.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

//Loop over products and create an element
products.forEach((product)=>{
    const productElement = createProductElement(product);  
    productElements.push(productElement);
    productsWrapper.appendChild(productElement);

});

//Create product element
function createProductElement(product){
    const productElement = document.createElement('div');
    productElement.className = 'item space-y-2';

    productElement.innerHTML = `
    <div class="bg-gray-100 flex justify-center relative overflow-hidden cursor-pointer border rounded-xl">
        <img 
         src="${product.url}"
         alt="${product.name}" 
         class="w-full h-full object-cover">
        <button 
        class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition">Add to Cart</button>
    </div>
    <p class="text-xl">${product.name}</p>
    <strong>${product.price.toLocaleString()}</strong>
    `;
    
    productElement.querySelector('.status').addEventListener('click', updateCart);

    return productElement;
}

// Add or remove item from cart
function updateCart(e){
    const statusEl = e.target;

    if (statusEl.classList.contains('added')){
        // Remove from Cart
        statusEl.classList.remove('added');
        statusEl.innerText = 'Add To Cart';
        statusEl.classList.remove('bg-red-600');
        statusEl.classList.add('bg-gray-800');

        cartItemCount--;
    } else {
        // Add to cart
        statusEl.classList.add('added');
        statusEl.innerText = 'Remove From Cart';
        statusEl.classList.remove('bg-gray-800');
        statusEl.classList.add('bg-red-600');

        cartItemCount++;
    }

    // Update cart item count
    cartCount.innerText = cartItemCount.toString();
}

// Filter products by checkboxes and search input

function filterProducts(){
    // Get search term
    const searchTerm = searchInput.value.trim().toLowerCase();
    // Get checked categories
    const checkedCategories = Array.from(checkboxes)
    .filter((check) => check.checked)
    .map((check) => check.id);

    // Loop over products and check for matches
    productElements.forEach((productElement, index) => {
        const product = products[index];

        //check to see if the product matches the search or the checked categories
        const matchesSearchTerm = product.name.toLocaleLowerCase().includes(searchTerm);
        const isInCheckedCategory = 
        checkedCategories.length === 0 ||
        checkedCategories.includes(product.category);

        //Show or hide product based on matches
        if (matchesSearchTerm && isInCheckedCategory){
            productElement.classList.remove('hidden');
        } else {
            productElement.classList.add('hidden');
        }
    });
}
