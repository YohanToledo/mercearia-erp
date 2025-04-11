// DashboardAnalysisPage.tsx
import React from 'react';
import styled from 'styled-components';
import { Layout, Card, Row, Col, Select, Typography, Table, DatePicker } from 'antd';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
    Legend, ResponsiveContainer
} from 'recharts';
import {
    AlertOutlined, ShoppingOutlined, DollarOutlined,
    ClockCircleOutlined, PercentageOutlined
} from '@ant-design/icons';
import { FaMoneyBillWave, FaCreditCard, FaMobileAlt } from 'react-icons/fa';

// Mock Data
import {
    stockData,
    stockTurnoverData,
    discountedProductsData,
    profitMarginData,
    paymentMethodData
} from './mock-analysis.data';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

// Interfaces
interface StockItem {
    id: number;
    name: string;
    daysSinceLastSale: number;
    stockValue: number;
    quantity: number;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

type TimeRangeType = 'week' | 'month' | 'quarter' | 'year';

// Styled Components
const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  background-color: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
`;

const StyledContent = styled(Content)`
  margin: 24px 16px;
`;

const DashboardCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  height: 100%;
`;

const ChartTitle = styled(Title)`
  font-size: 16px !important;
  margin-bottom: 20px !important;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const COLORS: string[] = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28AFF'];

export function DashboardAnalysisPage() {
    // const [timeRange, setTimeRange] = useState<TimeRangeType>('month');

    const handleRangeChange = (value: TimeRangeType): void => {
        console.log(value)
        // setTimeRange(value);
        // Here would go logic to update data based on selected time range
    };

    // Configure table columns
    const stuckInventoryColumns = [
        {
            title: 'Produto',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Dias sem vendas',
            dataIndex: 'daysSinceLastSale',
            key: 'daysSinceLastSale',
            sorter: (a: StockItem, b: StockItem) => a.daysSinceLastSale - b.daysSinceLastSale,
        },
        {
            title: 'Valor em estoque',
            dataIndex: 'stockValue',
            key: 'stockValue',
            render: (value: number) => `R$ ${value.toFixed(2)}`,
            sorter: (a: StockItem, b: StockItem) => a.stockValue - b.stockValue,
        },
        {
            title: 'Quantidade',
            dataIndex: 'quantity',
            key: 'quantity',
        },
    ];

    const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    backgroundColor: '#fff',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                }}>
                    <p style={{ margin: 0 }}>{`${label}: ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <StyledLayout>
            <StyledHeader>
                <Title level={3} style={{ margin: 0 }}>
                    Dashboard Financeiro - Análise de Prejuízos
                </Title>
                <FilterContainer>
                    <Select
                        defaultValue="month"
                        style={{ width: 120 }}
                        onChange={(value: string) => handleRangeChange(value as TimeRangeType)}
                    >
                        <Option value="week">Última Semana</Option>
                        <Option value="month">Último Mês</Option>
                        <Option value="quarter">Último Trimestre</Option>
                        <Option value="year">Último Ano</Option>
                    </Select>
                    <RangePicker />
                </FilterContainer>
            </StyledHeader>

            <StyledContent>
                <Row gutter={[24, 24]}>
                    {/* Produtos com estoque parado */}
                    <Col xs={24} lg={12}>
                        <DashboardCard title={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <AlertOutlined style={{ color: '#FF4D4F', marginRight: 8 }} />
                                <ChartTitle level={4}>Produtos com Estoque Parado</ChartTitle>
                            </div>
                        }>
                            <Table<StockItem>
                                dataSource={stockData}
                                columns={stuckInventoryColumns}
                                pagination={{ pageSize: 5 }}
                                rowKey="id"
                                size="small"
                            />
                        </DashboardCard>
                    </Col>

                    {/* Giro de estoque */}
                    <Col xs={24} lg={12}>
                        <DashboardCard title={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ClockCircleOutlined style={{ color: '#1890FF', marginRight: 8 }} />
                                <ChartTitle level={4}>Giro de Estoque (Dias)</ChartTitle>
                            </div>
                        }>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={stockTurnoverData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="category" />
                                    <YAxis />
                                    <RechartsTooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Bar
                                        dataKey="averageDaysToSell"
                                        name="Dias Médios para Vender"
                                        fill="#1890FF"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </DashboardCard>
                    </Col>

                    {/* Produtos mais frequentemente vendidos com desconto */}
                    <Col xs={24} lg={12}>
                        <DashboardCard title={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <PercentageOutlined style={{ color: '#FAAD14', marginRight: 8 }} />
                                <ChartTitle level={4}>Produtos Frequentemente Vendidos com Desconto</ChartTitle>
                            </div>
                        }>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={discountedProductsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis yAxisId="left" orientation="left" stroke="#FF8042" />
                                    <YAxis yAxisId="right" orientation="right" stroke="#FAAD14" />
                                    <RechartsTooltip />
                                    <Legend />
                                    <Bar
                                        yAxisId="left"
                                        dataKey="discountFrequency"
                                        name="Frequência de Desconto (%)"
                                        fill="#FF8042"
                                    />
                                    <Bar
                                        yAxisId="right"
                                        dataKey="avgDiscountPercentage"
                                        name="Desconto Médio (%)"
                                        fill="#FAAD14"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </DashboardCard>
                    </Col>

                    {/* Margem de lucro por categoria de produto */}
                    <Col xs={24} lg={12}>
                        <DashboardCard title={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <DollarOutlined style={{ color: '#52C41A', marginRight: 8 }} />
                                <ChartTitle level={4}>Margem de Lucro por Categoria</ChartTitle>
                            </div>
                        }>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={profitMarginData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="category" />
                                    <YAxis domain={[0, 50]} tickFormatter={(tick: number) => `${tick}%`} />
                                    <RechartsTooltip formatter={(value: number) => `${value}%`} />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="profitMargin"
                                        name="Margem de Lucro"
                                        stroke="#52C41A"
                                        strokeWidth={2}
                                        activeDot={{ r: 8 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="targetMargin"
                                        name="Margem Alvo"
                                        stroke="#13C2C2"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </DashboardCard>
                    </Col>

                    {/* Quantidade de vendas por tipo de pagamento */}
                    <Col xs={24}>
                        <DashboardCard title={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ShoppingOutlined style={{ color: '#722ED1', marginRight: 8 }} />
                                <ChartTitle level={4}>Vendas por Tipo de Pagamento</ChartTitle>
                            </div>
                        }>
                            <Row gutter={[24, 24]}>
                                <Col xs={24} md={12}>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={paymentMethodData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={true}
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="value"
                                                nameKey="name"
                                                label={({ name, percent }: { name: string; percent: number }) =>
                                                    `${name}: ${(percent * 100).toFixed(0)}%`
                                                }
                                            >
                                                {paymentMethodData.map((_, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Card bordered={false}>
                                        <Row gutter={[16, 16]}>
                                            {paymentMethodData.map((method, index) => (
                                                <Col xs={24} sm={8} key={method.name}>
                                                    <Card bordered={false} style={{ background: '#f5f5f5' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <div>
                                                                {method.name === 'Dinheiro' && <FaMoneyBillWave size={24} color={COLORS[index]} />}
                                                                {method.name === 'Cartão' && <FaCreditCard size={24} color={COLORS[index]} />}
                                                                {method.name === 'Pix' && <FaMobileAlt size={24} color={COLORS[index]} />}
                                                                {method.name === 'Boleto' && <AlertOutlined style={{ fontSize: 24, color: COLORS[index] }} />}
                                                                {method.name === 'Outros' && <ShoppingOutlined style={{ fontSize: 24, color: COLORS[index] }} />}
                                                            </div>
                                                            <div>
                                                                <Title level={5} style={{ margin: 0 }}>
                                                                    {method.name}
                                                                </Title>
                                                                <Text>R$ {method.value.toFixed(2)}</Text>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                        </DashboardCard>
                    </Col>
                </Row>
            </StyledContent>
        </StyledLayout>
    );
};
