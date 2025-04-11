// mockData.ts

// Top 10 produtos mais vendidos
export const topProducts = [
    { name: "Smartphone XYZ", quantity: 254, revenue: 152400 },
    { name: "Notebook Ultra", quantity: 187, revenue: 374000 },
    { name: "Smart TV 55\"", quantity: 143, revenue: 214500 },
    { name: "Fone de Ouvido Bluetooth", quantity: 132, revenue: 13200 },
    { name: "Console de Jogos", quantity: 98, revenue: 147000 },
    { name: "Câmera Digital", quantity: 87, revenue: 65250 },
    { name: "Relógio Inteligente", quantity: 76, revenue: 22800 },
    { name: "Tablet Pro", quantity: 72, revenue: 72000 },
    { name: "Monitor Curvo 27\"", quantity: 65, revenue: 84500 },
    { name: "Mouse Gamer", quantity: 59, revenue: 8850 }
  ];
  
  // Top 10 produtos menos vendidos
  export const leastSellingProducts = [
    { name: "Adaptador HDMI", quantity: 12, revenue: 600 },
    { name: "Cabo USB Tipo-C", quantity: 15, revenue: 750 },
    { name: "Estabilizador", quantity: 18, revenue: 1800 },
    { name: "Hub USB", quantity: 21, revenue: 1260 },
    { name: "Suporte para Notebook", quantity: 23, revenue: 1380 },
    { name: "Mousepad", quantity: 25, revenue: 750 },
    { name: "Pasta Térmica", quantity: 27, revenue: 810 },
    { name: "Película de Proteção", quantity: 29, revenue: 870 },
    { name: "Carregador Portátil", quantity: 31, revenue: 3100 },
    { name: "Caixa de Som Portátil", quantity: 33, revenue: 4950 }
  ];
  
  // Vendas por hora do dia
  export const salesByHour = [
    { hour: "8h", sales: 28 },
    { hour: "9h", sales: 42 },
    { hour: "10h", sales: 58 },
    { hour: "11h", sales: 69 },
    { hour: "12h", sales: 74 },
    { hour: "13h", sales: 62 },
    { hour: "14h", sales: 56 },
    { hour: "15h", sales: 67 },
    { hour: "16h", sales: 85 },
    { hour: "17h", sales: 103 },
    { hour: "18h", sales: 132 },
    { hour: "19h", sales: 145 },
    { hour: "20h", sales: 126 },
    { hour: "21h", sales: 98 },
    { hour: "22h", sales: 64 }
  ];
  
  // Vendas por dia da semana
  export const salesByDay = [
    { day: "Domingo", sales: 254 },
    { day: "Segunda", sales: 367 },
    { day: "Terça", sales: 385 },
    { day: "Quarta", sales: 412 },
    { day: "Quinta", sales: 457 },
    { day: "Sexta", sales: 528 },
    { day: "Sábado", sales: 642 }
  ];
  
  // Ticket médio
  export const averageTicket = {
    current: 457.85,
    history: [
      { month: "Jan", value: 432.12 },
      { month: "Fev", value: 438.45 },
      { month: "Mar", value: 425.78 },
      { month: "Abr", value: 442.19 },
      { month: "Mai", value: 438.67 },
      { month: "Jun", value: 444.32 },
      { month: "Jul", value: 448.75 },
      { month: "Ago", value: 452.10 },
      { month: "Set", value: 457.85 },
      { month: "Out", value: 462.23 },
      { month: "Nov", value: 475.48 },
      { month: "Dez", value: 492.75 }
    ]
  };
  
  // Vendas mensais para análise de sazonalidade
  export const monthlySales = [
    { month: "Jan", value: 352000 },
    { month: "Fev", value: 368000 },
    { month: "Mar", value: 345000 },
    { month: "Abr", value: 374000 },
    { month: "Mai", value: 392000 },
    { month: "Jun", value: 408000 },
    { month: "Jul", value: 429000 },
    { month: "Ago", value: 445000 },
    { month: "Set", value: 478000 },
    { month: "Out", value: 498000 },
    { month: "Nov", value: 542000 },
    { month: "Dez", value: 628000 }
  ];