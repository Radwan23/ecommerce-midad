const productListElement = document.getElementById('product-list');
const addProductForm = document.getElementById('add-product-form');

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="product-info">
            <h3>${product.title}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-product-id="${product.id}">أضف إلى السلة</button>
        </div>
    `;

    const addToCartButton = productCard.querySelector('.add-to-cart-btn');
    addToCartButton.addEventListener('click', () => {
        addToCart(product);
    });

    return productCard;
}


function displayProducts(products) {
    productListElement.innerHTML = '';
    products.forEach(product => {
        const card = createProductCard(product);
        productListElement.appendChild(card);
    });
}

async function handleAddProductFormSubmit(event) {
    event.preventDefault();

    const title = document.getElementById('product-title').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const description = document.getElementById('product-description').value;
    const category = document.getElementById('product-category').value;
    const image = document.getElementById('product-image').value;

    if (!title || isNaN(price) || price <= 0 || !description || !category || !image) {
        alert('يرجى ملء جميع الحقول بشكل صحيح.');
        return;
    }

    const newProductData = {
        title,
        price,
        description,
        image,
        category
    };

    const addedProduct = await addProduct(newProductData);
    if (addedProduct) {
        alert(`تم إضافة المنتج "${addedProduct.title}" بنجاح!`);

        addProductForm.reset();
    }
}


async function loadProducts() {
    const products = await fetchProducts();
    displayProducts(products);
}


document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    addProductForm.addEventListener('submit', handleAddProductFormSubmit);
});