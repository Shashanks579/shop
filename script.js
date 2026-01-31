// 1. Define the Products Data (simulating a database)
const products = [
    { id: 1, name: "Intel Core i9-13900K", category: "Processor", price: 589 },
    { id: 2, name: "AMD Ryzen 9 7950X", category: "Processor", price: 550 },
    { id: 3, name: "NVIDIA RTX 4090", category: "Graphics Card", price: 1599 },
    { id: 4, name: "ASUS ROG Strix Z790", category: "Motherboard", price: 399 },
    { id: 5, name: "Corsair Vengeance 32GB RAM", category: "RAM", price: 129 },
    { id: 6, name: "Samsung 990 Pro 2TB SSD", category: "Storage", price: 169 },
    { id: 7, name: "Corsair RM1000x PSU", category: "Power Supply", price: 189 },
    { id: 8, name: "Noctua NH-D15 Cooler", category: "CPU Cooler", price: 109 }
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
                    <h3>${product.name}</h3>
                    <p>${product.category}</p>
                    <span class="price">$${product.price}</span>
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
            totalPriceElement.innerText = "$0.00";
            return;
        }

        // Generate Table Rows
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>$${item.price}</td>
                <td><span class="remove-btn" onclick="removeFromCart(${index})">Remove</span></td>
            </tr>
        `).join('');

        // Calculate Total
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalPriceElement.innerText = "$" + total.toFixed(2);
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