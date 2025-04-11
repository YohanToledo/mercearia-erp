// mockData.ts
// Dados mock para popular os gráficos do dashboard

// Interfaces
export interface StockItem {
    id: number;
    name: string;
    daysSinceLastSale: number;
    stockValue: number;
    quantity: number;
  }
  
  export interface StockTurnoverItem {
    category: string;
    averageDaysToSell: number;
    inventoryValue: number;
  }
  
  export interface DiscountedProductItem {
    name: string;
    discountFrequency: number;
    avgDiscountPercentage: number;
    revenueImpact: number;
  }
  
  export interface ProfitMarginItem {
    category: string;
    profitMargin: number;
    targetMargin: number;
    revenue: number;
  }
  
  export interface PaymentMethodItem {
    name: string;
    value: number;
    count: number;
  }
  
  export interface MonthlySalesItem {
    month: string;
    sales: number;
  }
  
  // 1. Produtos com estoque parado
  export const stockData: StockItem[] = [
    {
      id: 1,
      name: 'Tênis Esportivo Modelo XYZ',
      daysSinceLastSale: 120,
      stockValue: 3500.00,
      quantity: 15
    },
    {
      id: 2,
      name: 'Camiseta Vintage Tamanho GG',
      daysSinceLastSale: 95,
      stockValue: 1200.00,
      quantity: 30
    },
    {
      id: 3,
      name: 'Bolsa de Couro Premium',
      daysSinceLastSale: 82,
      stockValue: 4250.00,
      quantity: 8
    },
    {
      id: 4,
      name: 'Relógio Analógico Classic',
      daysSinceLastSale: 78,
      stockValue: 2800.00,
      quantity: 7
    },
    {
      id: 5,
      name: 'Calça Jeans Modelo Slim',
      daysSinceLastSale: 65,
      stockValue: 1850.00,
      quantity: 18
    },
    {
      id: 6,
      name: 'Jaqueta de Inverno Premium',
      daysSinceLastSale: 60,
      stockValue: 5200.00,
      quantity: 12
    },
    {
      id: 7,
      name: 'Óculos de Sol Esportivo',
      daysSinceLastSale: 55,
      stockValue: 980.00,
      quantity: 9
    },
    {
      id: 8,
      name: 'Chapéu Estilo Panamá',
      daysSinceLastSale: 52,
      stockValue: 750.00,
      quantity: 20
    }
  ];
  
  // 2. Giro de estoque por categoria
  export const stockTurnoverData: StockTurnoverItem[] = [
    {
      category: 'Calçados',
      averageDaysToSell: 45,
      inventoryValue: 15000.00
    },
    {
      category: 'Roupas',
      averageDaysToSell: 30,
      inventoryValue: 22000.00
    },
    {
      category: 'Acessórios',
      averageDaysToSell: 60,
      inventoryValue: 8500.00
    },
    {
      category: 'Eletrônicos',
      averageDaysToSell: 20,
      inventoryValue: 35000.00
    },
    {
      category: 'Esportes',
      averageDaysToSell: 35,
      inventoryValue: 12000.00
    },
    {
      category: 'Decoração',
      averageDaysToSell: 75,
      inventoryValue: 9800.00
    }
  ];
  
  // 3. Produtos mais frequentemente vendidos com desconto
  export const discountedProductsData: DiscountedProductItem[] = [
    {
      name: 'Tênis Casual',
      discountFrequency: 85,
      avgDiscountPercentage: 25,
      revenueImpact: 7500.00
    },
    {
      name: 'Camisetas Básicas',
      discountFrequency: 78,
      avgDiscountPercentage: 15,
      revenueImpact: 3200.00
    },
    {
      name: 'Jaquetas',
      discountFrequency: 65,
      avgDiscountPercentage: 30,
      revenueImpact: 9100.00
    },
    {
      name: 'Calças Jeans',
      discountFrequency: 60,
      avgDiscountPercentage: 20,
      revenueImpact: 4500.00
    },
    {
      name: 'Relógios',
      discountFrequency: 40,
      avgDiscountPercentage: 12,
      revenueImpact: 2800.00
    }
  ];
  
  // 4. Margem de lucro por categoria de produto
  export const profitMarginData: ProfitMarginItem[] = [
    {
      category: 'Calçados',
      profitMargin: 35,
      targetMargin: 40,
      revenue: 28000.00
    },
    {
      category: 'Roupas',
      profitMargin: 42,
      targetMargin: 40,
      revenue: 45000.00
    },
    {
      category: 'Acessórios',
      profitMargin: 48,
      targetMargin: 40,
      revenue: 18000.00
    },
    {
      category: 'Eletrônicos',
      profitMargin: 25,
      targetMargin: 30,
      revenue: 62000.00
    },
    {
      category: 'Esportes',
      profitMargin: 38,
      targetMargin: 40,
      revenue: 15000.00
    },
    {
      category: 'Decoração',
      profitMargin: 45,
      targetMargin: 40,
      revenue: 12000.00
    }
  ];
  
  // 5. Quantidade de vendas por tipo de pagamento
  export const paymentMethodData: PaymentMethodItem[] = [
    { name: 'Cartão', value: 85000.00, count: 450 },
    { name: 'Pix', value: 65000.00, count: 320 },
    { name: 'Dinheiro', value: 25000.00, count: 180 },
    { name: 'Boleto', value: 18000.00, count: 90 },
    { name: 'Outros', value: 7000.00, count: 40 }
  ];
  
  // Dados adicionais para possíveis expansões do dashboard
  export const monthlySalesData: MonthlySalesItem[] = [
    { month: 'Jan', sales: 35000 },
    { month: 'Fev', sales: 38000 },
    { month: 'Mar', sales: 42000 },
    { month: 'Abr', sales: 40000 },
    { month: 'Mai', sales: 45000 },
    { month: 'Jun', sales: 48000 },
    { month: 'Jul', sales: 52000 },
    { month: 'Ago', sales: 55000 },
    { month: 'Set', sales: 49000 },
    { month: 'Out', sales: 52000 },
    { month: 'Nov', sales: 60000 },
    { month: 'Dez', sales: 70000 }
  ];