const FAKESTORE_API_BASE_URL = 'https://fakestoreapi.com';

/**
 * يجلب جميع المنتجات من FakeStore API.
 * @returns {Promise<Array>} مصفوفة من كائنات المنتجات.
 */
async function fetchProducts() {
    try {
        const response = await fetch(`${FAKESTORE_API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return []; // إرجاع مصفوفة فارغة في حالة الخطأ
    }
}

/**
 * يضيف منتجًا جديدًا إلى FakeStore API.
 * (ملاحظة: FakeStore API لا يقوم بحفظ البيانات فعلياً، ولكن سيعيد استجابة نجاح).
 * @param {Object} productData - بيانات المنتج الجديد.
 * @returns {Promise<Object>} كائن المنتج الذي تم إضافته (معرف وهمي).
 */
async function addProduct(productData) {
    try {
        const response = await fetch(`${FAKESTORE_API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newProduct = await response.json();
        return newProduct;
    } catch (error) {
        console.error('Error adding product:', error);
        alert('حدث خطأ أثناء إضافة المنتج. يرجى المحاولة مرة أخرى.');
        return null;
    }
}