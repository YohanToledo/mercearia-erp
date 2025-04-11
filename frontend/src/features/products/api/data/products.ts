interface Product {
    id: string;
    name: string;
    salePrice: number;
    stock: number;
    status: 'ACTIVED' | 'DISABLED'
}

let products: Product[] = [];

function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function loadProductsFromLocalStorage() {
    const storedProducts = localStorage.getItem('products');
    products = storedProducts ? JSON.parse(storedProducts) : [];
}


// Create a new product
export function createNewProduct(product: Omit<Product, 'id'>): Product {
    loadProductsFromLocalStorage();

    const newProduct: Product = { id: String(Date.now()), ...product };
    products.push(newProduct);
    saveProductsToLocalStorage();
    return newProduct;
}

// Read all products
export function getProducts() {
    loadProductsFromLocalStorage();

    return {
        data: {
            content: products,
            page: {
                current: 1,
                size: products.length,
                totalCount: products.length,
                totalPages: 1
            }
        }
    }
}

// Read a single product by ID
export function getProductById(id: string): Product | undefined {
    loadProductsFromLocalStorage();

    return products.find(product => product.id === id);
}

// Update a product by ID
export function _updateProduct(id: string, updatedProduct: Partial<Omit<Product, 'id'>>): Product | undefined {
    loadProductsFromLocalStorage();

    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex === -1) return undefined;

    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    saveProductsToLocalStorage();

    return products[productIndex];
}

export function _updateProductStatus(id: string, status: 'ACTIVED' | 'DISABLED'): Product | undefined {
    loadProductsFromLocalStorage();

    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex === -1) return undefined;

    products[productIndex] = { ...products[productIndex], status };

    saveProductsToLocalStorage();
    return products[productIndex];
}

// Delete a product by ID
export function deleteProduct(id: string): boolean {
    loadProductsFromLocalStorage();

    const initialLength = products.length;
    products = products.filter(product => product.id !== id);

    saveProductsToLocalStorage();
    return products.length < initialLength;
}