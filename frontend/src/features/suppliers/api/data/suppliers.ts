interface Supplier {
    id: string
    name: string
    description: string | null
    phone: string | null
    email: string | null
    status: 'ACTIVE' | 'INACTIVE'
}

let suppliers: Supplier[] = [];

function saveSuppliersToLocalStorage() {
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
}

function loadSuppliersFromLocalStorage() {
    const storedSuppliers = localStorage.getItem('suppliers');
    suppliers = storedSuppliers ? JSON.parse(storedSuppliers) : [];
}


// Create a new supplier
export function createNewSupplier(supplier: Omit<Supplier, 'id'>): Supplier {
    loadSuppliersFromLocalStorage();

    const newSupplier: Supplier = { id: String(Date.now()), ...supplier };
    suppliers.push(newSupplier);
    saveSuppliersToLocalStorage();
    return newSupplier;
}

// Read all suppliers
export function getSuppliers() {
    loadSuppliersFromLocalStorage();

    return {
        data: {
            content: suppliers,
            page: {
                current: 1,
                size: suppliers.length,
                totalCount: suppliers.length,
                totalPages: 1
            }
        }
    }
}

// Read a single supplier by ID
export function getSupplierById(id: string): Supplier | undefined {
    loadSuppliersFromLocalStorage();

    return suppliers.find(supplier => supplier.id === id);
}

// Update a supplier by ID
export function _updateSupplier(id: string, updatedSupplier: Partial<Omit<Supplier, 'id'>>): Supplier | undefined {
    loadSuppliersFromLocalStorage();

    const supplierIndex = suppliers.findIndex(supplier => supplier.id === id);
    if (supplierIndex === -1) return undefined;

    suppliers[supplierIndex] = { ...suppliers[supplierIndex], ...updatedSupplier };
    saveSuppliersToLocalStorage();

    return suppliers[supplierIndex];
}

export function _updateSupplierStatus(id: string, status: 'ACTIVE' | 'INACTIVE'): Supplier | undefined {
    loadSuppliersFromLocalStorage();

    const supplierIndex = suppliers.findIndex(supplier => supplier.id === id);
    if (supplierIndex === -1) return undefined;

    suppliers[supplierIndex] = { ...suppliers[supplierIndex], status };

    saveSuppliersToLocalStorage();
    return suppliers[supplierIndex];
}

// Delete a supplier by ID
export function deleteSupplier(id: string): boolean {
    loadSuppliersFromLocalStorage();

    const initialLength = suppliers.length;
    suppliers = suppliers.filter(supplier => supplier.id !== id);

    saveSuppliersToLocalStorage();
    return suppliers.length < initialLength;
}