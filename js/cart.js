let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

const cartCountElement = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartModal = document.getElementById('cart-modal');
const cartIcon = document.getElementById('cart-icon');
const closeModalButton = document.querySelector('.cart-modal .close-button');


function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

/**
 * يضيف منتجًا إلى سلة التسوق أو يزيد من كميته.
 * @param {Object} product - المنتج المراد إضافته.
 */
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    alert(`تم إضافة "${product.title}" إلى السلة.`);
}

/**
 * يزيد كمية منتج معين في السلة.
 * @param {number} productId - معرف المنتج.
 */
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        saveCart();
    }
}

/**
 * ينقص كمية منتج معين في السلة أو يحذفه إذا كانت الكمية 1.
 * @param {number} productId - معرف المنتج.
 */
function decreaseQuantity(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
        } else {
            cart.splice(itemIndex, 1); // حذف المنتج إذا كانت الكمية 1
        }
        saveCart();
    }
}

/**
 * يحذف منتجًا بالكامل من سلة التسوق.
 * @param {number} productId - معرف المنتج.
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}


function renderCartItems() {
    updateCartCount();
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; margin-top: 20px; color: #777;">سلة التسوق فارغة.</p>';
    } else {
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <p class="price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button data-id="${item.id}" class="decrease-quantity">-</button>
                    <span>${item.quantity}</span>
                    <button data-id="${item.id}" class="increase-quantity">+</button>
                </div>
                <button data-id="${item.id}" class="remove-item-btn">حذف</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            total += item.price * item.quantity;
        });
    }
    cartTotalElement.textContent = total.toFixed(2);

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.id);
            decreaseQuantity(productId);
        });
    });

    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.id);
            increaseQuantity(productId);
        });
    });

    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.id);
            removeFromCart(productId);
        });
    });
}


function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

cartIcon.addEventListener('click', (event) => {
    event.preventDefault();
    cartModal.classList.add('show');
    renderCartItems(); // تأكد من تحديث العناصر عند فتح السلة
});

closeModalButton.addEventListener('click', () => {
    cartModal.classList.remove('show');
});

window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.classList.remove('show');
    }
});

updateCartCount();