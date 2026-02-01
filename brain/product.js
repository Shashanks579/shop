// 1. Define the Products Data (simulating a database)
const products = [
  { id: 1,image:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSQ6-E97_8E44ektQs1oTOV9w8Zul6ZsFbjOH2NgoU5BYVd4HyX1uEkNu_v_aPXrtGwfh5s2moJ_QynR5Hx2qKKTMxN__Qv9A", name: "Intel Core i9-13900H", category: "Processor", price: 46800 },
    { id: 2,image:"https://m.media-amazon.com/images/I/5116zdA9uyL._AC_UF1000,1000_QL80_.jpg", name: "AMD Ryzen 9 9950X", category: "Processor", price: 70200 },
    { id: 3,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD6Lo5l9N4JYyZsjYA6dH30QItp06QzkLHTg&s", name: "NVIDIA RTX 5090", category: "Graphics Card", price: 300000 },
    { id: 4,image:"https://images.unsplash.com/photo-1674741382863-7e26f78a7fbe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QVNVUyUyMFJPRyUyMFN0cml4fGVufDB8fDB8fHww?q=80&w=50&h=615&auto=format&fit=crop", name: "ASUS ROG Strix Z790", category: "Motherboard", price: 17000 },
    { id: 5, image: "https://images.unsplash.com/photo-1592664474505-51c549ad15c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFtfGVufDB8fDB8fHww?q=80&w=500&h=615&auto=format&fit=crop", name: "Trident Z Neo DDR5 RAM", category: "RAM", price: 37899 },
    { id: 6, image: "https://images.unsplash.com/photo-1734605022656-937e1cf0839d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U2Ftc3VuZyUyMDk5MCUyMFBybyUyMFNTRHxlbnwwfHwwfHx8MA%3D%3D?q=80&w=500&h=615&auto=format&fit=crop", name: "Samsung 990 Pro 2TB SSD", category: "Storage", price: 38729 },
    { id: 7, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt8NsajfuLIEIbmyjej5kPjmlCigsOe8sMDA&s?q=80&w=500&h=500&auto=format&fit=crop", name: "Corsair RM1000x PSU", category: "Power Supply", price: 12899 },
    { id: 8, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtoQm153gUxMlbBKGdZjIOLFHrZH_F25i0HQ&s?q=80&w=500&h=1000&auto=format&fit=crop", name: "Noctua NH-D15 Cooler", category: "CPU Cooler", price: 22999 },
    { id: 9, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7rZrpYhiVvFO8tsb9xjpRe52aABlH2VIrsA&s?q=80&w=500&h=500&auto=format&fit=crop", name: "Lian Li O11 Dynamic EVO", category: "Case", price: 13299 },
    { id: 10, image: "https://images.unsplash.com/photo-1628082550734-43fee7182e05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fExHJTIwVWx0cmFHZWFyJTIwMjclMjIlMjBNb25pdG9yfGVufDB8fDB8fHww?q=80&w=500&h=615&auto=format&fit=crop", name: "LG UltraGear 27\" Monitor", category: "Monitor", price: 32899 }
];

// 2. Function to Render Products on Home Page
function renderProducts() {
    const productContainer = document.getElementById('product-list');
    
    // Only run this if we are on the page with the product container
    if (productContainer) {
        // Get cart to check which items are already added
        let cart = JSON.parse(localStorage.getItem('ruixCart')) || [];
        const cartIds = cart.map(item => item.id);
        
        productContainer.innerHTML = products.map(product => {
            const isInCart = cartIds.includes(product.id);
            return `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.category}</p>
                    <span class="price">₹${product.price}</span>
                    ${isInCart ? 
                        '<button class="add-btn" disabled style="background-color: #ccc; cursor: not-allowed;">✓ In Cart</button>' 
                        : `<button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>`
                    }
                </div>
            `;
        }).join('');
    }
}

// 3. Function to Add Item to Cart (LocalStorage)
function addToCart(productId) {
    // Find the product details based on ID
    const product = products.find(p => p.id === productId);
    
    // Get existing cart from local storage or create empty array
    let cart = JSON.parse(localStorage.getItem('ruixCart')) || [];
    
    // Add new product to cart
    cart.push(product);
    
    // Save back to local storage
    localStorage.setItem('ruixCart', JSON.stringify(cart));
    
    // Visual feedback
    const button = event.target;
    button.textContent = "✓ Added!";
    button.style.backgroundColor = "#1ab8cc";
    button.disabled = true;
    
    setTimeout(() => {
        renderProducts(); // Re-render to hide the button
        updateCartCount();
    }, 500);
}

// 4. Function to Render Cart Page
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    // Only run if we are on the cart page
    if (cartItemsContainer) {
        let cart = JSON.parse(localStorage.getItem('ruixCart')) || [];
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<tr><td colspan='4'>Your cart is empty.</td></tr>";
            totalPriceElement.innerText = "0.00";
            return;
        }

        // Generate Table Rows
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>₹${item.price}</td>
                <td><span class="remove-btn" onclick="removeFromCart(${index})">Remove</span></td>
            </tr>
        `).join('');

        // Calculate Total
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalPriceElement.innerText =  total.toFixed(2);
    }
}

// 5. Remove Item from Cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('ruixCart')) || [];
    cart.splice(index, 1); // Remove item at specific index
    localStorage.setItem('ruixCart', JSON.stringify(cart));
    renderCart(); // Re-render the cart
    renderProducts(); // Re-render products on home page
    updateCartCount();
}

// 6. Clear Entire Cart
function clearCart() {
    if (confirm("Are you sure you want to clear the entire cart?")) {
        localStorage.removeItem('ruixCart');
        renderCart();
        renderProducts(); // Re-render products on home page
        updateCartCount();
    }
}

// 7. Update Cart Count in Navigation
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        let cart = JSON.parse(localStorage.getItem('ruixCart')) || [];
        cartCountElement.innerText = `(${cart.length})`;
    }
}

// Initialize functions when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
    updateCartCount();
});