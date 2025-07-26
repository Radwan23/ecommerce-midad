const FAKESTORE_API_BASE_URL = 'https://fakestoreapi.com';

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
        return [];
    }
}
