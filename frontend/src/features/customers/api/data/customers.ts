interface Customer {
    id: string
    name: string
    phone: string | null
    email: string | null
    status: 'ACTIVED' | 'DISABLED'
}

let customers: Customer[] = [];

function saveCustomersToLocalStorage() {
    localStorage.setItem('customers', JSON.stringify(customers));
}

function loadCustomersFromLocalStorage() {
    const storedCustomers = localStorage.getItem('customers');
    customers = storedCustomers ? JSON.parse(storedCustomers) : [];
}


// Create a new customer
export function createNewCustomer(customer: Omit<Customer, 'id'>): Customer {
    loadCustomersFromLocalStorage();

    const newCustomer: Customer = { id: String(Date.now()), ...customer };
    customers.push(newCustomer);
    saveCustomersToLocalStorage();
    return newCustomer;
}

// Read all customers
export function getCustomers() {
    loadCustomersFromLocalStorage();

    return {
        data: {
            content: customers,
            page: {
                current: 1,
                size: customers.length,
                totalCount: customers.length,
                totalPages: 1
            }
        }
    }
}

// Read a single customer by ID
export function getCustomerById(id: string): Customer | undefined {
    loadCustomersFromLocalStorage();

    return customers.find(customer => customer.id === id);
}

// Update a customer by ID
export function _updateCustomer(id: string, updatedCustomer: Partial<Omit<Customer, 'id'>>): Customer | undefined {
    loadCustomersFromLocalStorage();

    const customerIndex = customers.findIndex(customer => customer.id === id);
    if (customerIndex === -1) return undefined;

    customers[customerIndex] = { ...customers[customerIndex], ...updatedCustomer };
    saveCustomersToLocalStorage();

    return customers[customerIndex];
}

export function _updateCustomerStatus(id: string, status: 'ACTIVED' | 'DISABLED'): Customer | undefined {
    loadCustomersFromLocalStorage();

    const customerIndex = customers.findIndex(customer => customer.id === id);
    if (customerIndex === -1) return undefined;

    customers[customerIndex] = { ...customers[customerIndex], status };

    saveCustomersToLocalStorage();
    return customers[customerIndex];
}

// Delete a customer by ID
export function deleteCustomer(id: string): boolean {
    loadCustomersFromLocalStorage();

    const initialLength = customers.length;
    customers = customers.filter(customer => customer.id !== id);

    saveCustomersToLocalStorage();
    return customers.length < initialLength;
}