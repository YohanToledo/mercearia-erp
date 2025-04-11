import { useState } from 'react';
import styled from 'styled-components';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    LineChart, Line, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';
import {
    Layout, Card, Row, Col, Typography, Select, DatePicker,
    Statistic
} from 'antd';
import {
    RiseOutlined, ShoppingOutlined,
    CalendarOutlined, DollarOutlined
} from '@ant-design/icons';
import { FiBarChart2, FiActivity, FiClock } from 'react-icons/fi';

// Mock Data
import {
    topProducts,
    leastSellingProducts,
    salesByHour,
    salesByDay,
    averageTicket,
    monthlySales
} from './mock-data';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Styled Components
const DashboardContainer = styled(Layout)`
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const DashboardHeader = styled(Header)`
  background-color: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const DashboardContent = styled(Content)`
  margin: 24px;
`;

const StyledCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  height: 100%;
`;

const ChartTitle = styled(Title)`
  display: flex !important;
  align-items: center !important;
  font-size: 16px !important;
  margin-bottom: 24px !important;
`;

const IconWrapper = styled.span`
  margin-right: 10px;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

const FilterLabel = styled(Text)`
  margin-bottom: 8px;
  font-weight: 500;
`;

// Colors
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFF', '#FF6B6B', '#4ECDC4', '#C7F464', '#81B29A', '#F2CC8F'];

export function DashboardAnalysisPage2() {
    const [period, setPeriod] = useState('month');
    console.log(period)

    return (
        <DashboardContainer>
            <DashboardHeader>
                <Title level={3} style={{ margin: 0 }}>Dashboard de Análise de Vendas</Title>
            </DashboardHeader>

            <DashboardContent>
                <FiltersContainer>
                    <FilterItem>
                        <FilterLabel>Período</FilterLabel>
                        <Select defaultValue="month" style={{ width: '100%' }} onChange={value => setPeriod(value)}>
                            <Option value="day">Hoje</Option>
                            <Option value="week">Esta Semana</Option>
                            <Option value="month">Este Mês</Option>
                            <Option value="year">Este Ano</Option>
                        </Select>
                    </FilterItem>

                    <FilterItem>
                        <FilterLabel>Intervalo de Datas</FilterLabel>
                        <RangePicker style={{ width: '100%' }} />
                    </FilterItem>
                </FiltersContainer>

                {/* KPI Cards Row */}
                <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                    <Col xs={24} sm={12} md={6}>
                        <StyledCard>
                            <Statistic
                                title="Total de Vendas"
                                value={monthlySales.reduce((sum, item) => sum + item.value, 0)}
                                precision={2}
                                prefix={<ShoppingOutlined />}
                                suffix="R$"
                            />
                        </StyledCard>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <StyledCard>
                            <Statistic
                                title="Ticket Médio"
                                value={averageTicket.current}
                                precision={2}
                                prefix={<DollarOutlined />}
                                suffix="R$"
                            />
                        </StyledCard>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <StyledCard>
                            <Statistic
                                title="Variação do Mês"
                                value={9.8}
                                precision={1}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<RiseOutlined />}
                                suffix="%"
                            />
                        </StyledCard>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <StyledCard>
                            <Statistic
                                title="Produtos Vendidos"
                                value={topProducts.reduce((sum, item) => sum + item.quantity, 0)}
                                prefix={<ShoppingOutlined />}
                            />
                        </StyledCard>
                    </Col>
                </Row>

                {/* Top and Least Selling Products */}
                <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                    <Col xs={24} md={12}>
                        <StyledCard>
                            <ChartTitle level={4}>
                                <IconWrapper><FiBarChart2 /></IconWrapper>
                                Top 10 Produtos Mais Vendidos
                            </ChartTitle>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={topProducts}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis type="category" dataKey="name" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="quantity" fill="#0088FE" name="Quantidade Vendida" />
                                    <Bar dataKey="revenue" fill="#00C49F" name="Receita (R$)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </StyledCard>
                    </Col>

                    <Col xs={24} md={12}>
                        <StyledCard>
                            <ChartTitle level={4}>
                                <IconWrapper><FiBarChart2 /></IconWrapper>
                                Top 10 Produtos Menos Vendidos
                            </ChartTitle>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={leastSellingProducts}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis type="category" dataKey="name" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="quantity" fill="#FF8042" name="Quantidade Vendida" />
                                    <Bar dataKey="revenue" fill="#FFBB28" name="Receita (R$)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </StyledCard>
                    </Col>
                </Row>

                {/* Best Times for Sales */}
                <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                    <Col xs={24} md={12}>
                        <StyledCard>
                            <ChartTitle level={4}>
                                <IconWrapper><FiClock /></IconWrapper>
                                Melhores Horários para Vendas
                            </ChartTitle>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    data={salesByHour}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="hour" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        name="Vendas"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </StyledCard>
                    </Col>

                    <Col xs={24} md={12}>
                        <StyledCard>
                            <ChartTitle level={4}>
                                <IconWrapper><CalendarOutlined /></IconWrapper>
                                Melhores Dias para Vendas
                            </ChartTitle>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={salesByDay}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="sales" fill="#A28BFF" name="Vendas" />
                                </BarChart>
                            </ResponsiveContainer>
                        </StyledCard>
                    </Col>
                </Row>

                {/* Average Ticket and Monthly Sales */}
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <StyledCard>
                            <ChartTitle level={4}>
                                <IconWrapper><DollarOutlined /></IconWrapper>
                                Evolução do Ticket Médio
                            </ChartTitle>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart
                                    data={averageTicket.history}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`R$ ${value}`, 'Ticket Médio']} />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#FF6B6B"
                                        strokeWidth={2}
                                        name="Ticket Médio"
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </StyledCard>
                    </Col>

                    <Col xs={24} md={12}>
                        <StyledCard>
                            <ChartTitle level={4}>
                                <IconWrapper><FiActivity /></IconWrapper>
                                Variação de Vendas por Mês
                            </ChartTitle>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    data={monthlySales}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`R$ ${value}`, 'Vendas']} />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#4ECDC4"
                                        fill="#4ECDC4"
                                        name="Vendas Mensais"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </StyledCard>
                    </Col>
                </Row>

            </DashboardContent>
        </DashboardContainer>
    );
};
