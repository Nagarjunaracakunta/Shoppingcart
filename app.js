let products = [];
let cart = [];

// Fetch products from the fake API
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts();
    })
    .catch(error => console.error('Error fetching products:', error));

// Function to display products on the page
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear the list first

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        
        productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <img src="${product.image}" alt="${product.title}" style="width:100px;">
            <p>${product.description.substring(0, 50)}...</p>
            <p><strong>$${product.price}</strong></p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productList.appendChild(productDiv);
    });
}

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    displayCart();
}

// Function to increase quantity
function increaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    product.quantity++;
    displayCart();
}

// Function to decrease quantity
function decreaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product.quantity > 1) {
        product.quantity--;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    displayCart();
}

// Function to display cart items with extra charges and place order
function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = ''; // Clear the cart first

    let totalMRP = 0;
    let couponDiscount = 10; // Flat $10 coupon discount (can be dynamic)
    let platformFee = 5; // Platform fee (can be dynamic)
    let shippingCharges = 15; // Flat shipping fee (can be dynamic)

    // Display cart items
    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        const itemTotal = item.price * item.quantity;
        totalMRP += itemTotal;

        cartItemDiv.innerHTML = `
            <h4>${item.title}</h4>
            <p>Price: $${item.price}</p>
            <p>Quantity: 
                <button onclick="decreaseQuantity(${item.id})">-</button> 
                ${item.quantity} 
                <button onclick="increaseQuantity(${item.id})">+</button>
            </p>
            <p>Total: $${itemTotal.toFixed(2)}</p>
        `;

        cartDiv.appendChild(cartItemDiv);
    });

    // Calculate final amounts
    const totalAmount = totalMRP - couponDiscount + platformFee + shippingCharges;

    cartDiv.innerHTML += `
    <div class="price-details">
        <h3>Price Details</h3>
        <p>Total MRP: <span>$${totalMRP.toFixed(2)}</span></p>
        <p>Coupon Discount: <span>-$${couponDiscount.toFixed(2)}</span></p>
        <p>Platform Fee: <span>+$${platformFee.toFixed(2)}</span></p>
        <p>Shipping Charges: <span>+$${shippingCharges.toFixed(2)}</span></p>
        <p class="total-amount">Total Amount: <span>$${totalAmount.toFixed(2)}</span></p>
    </div>
    <button class="place-order-btn" onclick="placeOrder()">Place Order</button>
`;

    // // Display place order button
    // const placeOrderButton = document.createElement('button');
    // placeOrderButton.innerText = 'Place Order';
    // placeOrderButton.onclick = placeOrder;

    // cartDiv.appendChild(placeOrderButton);
}

// Function to handle placing the order
function placeOrder() {
    if (cart.length > 0) {
        alert('Order placed successfully!');
        cart = []; // Clear the cart after order
        displayCart();
    } else {
        alert('Your cart is empty!');
    }
}


