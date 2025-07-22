const productListElement = document.getElementById('product-list');
const addProductForm = document.getElementById('add-product-form');

/**
 * ينشئ بطاقة منتج HTML.
 * @param {Object} product - كائن المنتج.
 * @returns {HTMLElement} عنصر HTML لبطاقة المنتج.
 */
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

/**
 * يعرض قائمة المنتجات على الواجهة.
 * @param {Array} products - مصفوفة المنتجات.
 */
function displayProducts(products) {
    productListElement.innerHTML = ''; // مسح المنتجات الموجودة
    products.forEach(product => {
        const card = createProductCard(product);
        productListElement.appendChild(card);
    });
}

/**
 * يعالج إرسال نموذج إضافة منتج جديد.
 * @param {Event} event - كائن حدث الإرسال.
 */
async function handleAddProductFormSubmit(event) {
    event.preventDefault(); // منع الإرسال الافتراضي للنموذج

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

    const addedProduct = await addProduct(newProductData); // استدعاء وظيفة إضافة المنتج من api.js
    if (addedProduct) {
        alert(`تم إضافة المنتج "${addedProduct.title}" بنجاح!`);
        // تحديث قائمة المنتجات بعد الإضافة (يمكن إعادة جلب المنتجات أو إضافة المنتج الجديد للقائمة)
        // للحفاظ على البساطة، سنقوم بإعادة جلب جميع المنتجات
        loadProducts();
        addProductForm.reset(); // مسح النموذج
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