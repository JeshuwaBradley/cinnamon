// Sample cart items
// let cart = [
//     { id: 1, name: "Ceylon Cinnamon", price: 10, img: "https://via.placeholder.com/80" },
//     { id: 2, name: "Organic Turmeric", price: 8, img: "https://via.placeholder.com/80" },
// ];
// // Load cart from localStorage
// let cart = JSON.parse(localStorage.getItem('cart')) || [];
// // updateCartCount(); // add here

// function updateCartCount() {
//     const countEl = document.getElementById("cart-count");
//     countEl.textContent = length(cart);
// }
function updateCartCount() {
    const cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) {
        cartCountEl.textContent = cart.length;
    }
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();  // now it's safe

// Render Cart Items & Summary
function renderCart() {
    const cartItemsEl = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const taxEl = document.getElementById("tax");
    const totalEl = document.getElementById("total");
    if (cartItemsEl) {
        cartItemsEl.innerHTML = "";
        let subtotal = 0;

        if (cart.length > 0) {
            cart.forEach((item, index) => {
                subtotal += item.price;
                const itemEl = document.createElement("div");
                itemEl.classList.add("cart-item");
                itemEl.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
                cartItemsEl.appendChild(itemEl);
            });
        } else {
            // Cart is empty
            const emptyEl = document.createElement("div");
            emptyEl.classList.add("cart-empty");
            emptyEl.innerHTML = `
        <p>Your cart is currently empty.</p>
        <a href="/products.html" class="btn-continue">Continue Shopping</a>
    `;
            cartItemsEl.appendChild(emptyEl);
        }


        const tax = subtotal * 0.05; // 5% tax
        const total = subtotal + tax;

        subtotalEl.textContent = subtotal.toFixed(2);
        taxEl.textContent = tax.toFixed(2);
        totalEl.textContent = total.toFixed(2);
    }
    updateCartCount(); // add here
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1); // remove from array
    localStorage.setItem("cart", JSON.stringify(cart)); // update storage
    renderCart(); // refresh UI
    updateCartCount(); // add here
}

// Netlify Form: inject cart data before submit
const checkoutForm = document.getElementById("checkout-form");
if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
        const cartDataInput = document.getElementById("cart-data");
        cartDataInput.value = JSON.stringify(cart.map(item => `${item.name}  - $${item.price}`));
        localStorage.removeItem('cart');
        updateCartCount();
    });
}


renderCart();
