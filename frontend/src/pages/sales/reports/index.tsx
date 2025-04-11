import { useState } from 'react'
import {
  Card,
  Row,
  Col,
  Typography,
  Form,
  Select,
  DatePicker,
  Button,
  Checkbox,
  message,
  Space,
  InputNumber
} from 'antd'
import {
  FiDownload,
  FiPrinter,
  FiBarChart2,
  FiTrendingUp,
  FiTrendingDown
} from 'react-icons/fi'
import styled from 'styled-components'
import { Content } from '@/components/Content'

const { RangePicker } = DatePicker
const { Title } = Typography

// Styled components for enhanced styling
const ReportCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`

const ReportSection = styled.div`
  margin-bottom: 20px;
`

interface SalesReportFilters {
  dateRange?: [string, string]
  reportType: string
  includeColumns: string[]
  salesChannel?: string
  minSalesAmount?: number
  maxSalesAmount?: number
  productCategory?: string
  salesTrend?: 'INCREASING' | 'DECREASING' | 'ALL'
}

export function SalesReportsPage() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  // Available report types
  const reportTypes = [
    {
      value: 'detailed',
      label: 'Relatório Detalhado de Vendas'
    },
    {
      value: 'summary',
      label: 'Resumo de Vendas'
    },
    {
      value: 'comparative',
      label: 'Relatório Comparativo'
    },
    {
      value: 'top-selling',
      label: 'Produtos Mais Vendidos'
    }
  ]

  // Sales channels
  const salesChannels = [
    { value: 'all', label: 'Todos os Canais' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'physical-store', label: 'Loja Física' },
    { value: 'marketplace', label: 'Marketplace' },
    { value: 'telephone', label: 'Vendas por Telefone' }
  ]

  // Product categories
  const productCategories = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'electronics', label: 'Eletrônicos' },
    { value: 'clothing', label: 'Vestuário' },
    { value: 'home-goods', label: 'Produtos para Casa' },
    { value: 'books', label: 'Livros' }
  ]

  // Available columns to include in report
  const availableColumns = [
    { value: 'orderNumber', label: 'Número do Pedido' },
    { value: 'date', label: 'Data da Venda' },
    { value: 'productName', label: 'Nome do Produto' },
    { value: 'quantity', label: 'Quantidade' },
    { value: 'unitPrice', label: 'Preço Unitário' },
    { value: 'totalValue', label: 'Valor Total' },
    { value: 'paymentMethod', label: 'Método de Pagamento' },
    { value: 'salesChannel', label: 'Canal de Venda' },
    { value: 'customerName', label: 'Nome do Cliente' },
    { value: 'productCategory', label: 'Categoria do Produto' }
  ]

  const handleGenerateReport = async (values: SalesReportFilters) => {
    setLoading(true)
    try {
      // Simulated report generation logic
      console.log('Sales Report Filters:', values)

      // Here you would typically call an API to generate the report
      message.success('Relatório de Vendas gerado com sucesso!')
    } catch (error) {
      message.error('Erro ao gerar relatório de vendas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Content>
      <Row>
        <Col>
          <Title level={3}>Gerador de Relatórios de Vendas</Title>
        </Col>
      </Row>

      <ReportCard>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleGenerateReport}
        >
          <ReportSection>
            <Title level={5}>Tipo de Relatório</Title>
            <Form.Item
              name="reportType"
              rules={[{ required: true, message: 'Selecione um tipo de relatório' }]}
            >
              <Select
                placeholder="Selecione o tipo de relatório"
                options={reportTypes}
              />
            </Form.Item>
          </ReportSection>

          <ReportSection>
            <Title level={5}>Período</Title>
            <Form.Item name="dateRange">
              <RangePicker
                style={{ width: '100%' }}
                placeholder={['Data Inicial', 'Data Final']}
              />
            </Form.Item>
          </ReportSection>

          <ReportSection>
            <Title level={5}>Filtros Adicionais</Title>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="salesChannel">
                  <Select
                    placeholder="Canal de Vendas"
                    options={salesChannels}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="productCategory">
                  <Select
                    placeholder="Categoria de Produtos"
                    options={productCategories}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="salesTrend">
                  <Select
                    placeholder="Tendência de Vendas"
                    options={[
                      { value: 'ALL', label: 'Todos' },
                      {
                        value: 'INCREASING',
                        label: 'Crescente',
                        icon: <FiTrendingUp />
                      },
                      {
                        value: 'DECREASING',
                        label: 'Decrescente',
                        icon: <FiTrendingDown />
                      }
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Form.Item name="minSalesAmount">
                <Title level={5}>Valor mínimo de vendas</Title>
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder="Valor Mínimo de Venda"
                    formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    parser={value => value ? parseFloat(value.replace(/R\$\s?|\.*/g, '')) : 0}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="maxSalesAmount">
                <Title level={5}>Valor máximo de vendas</Title>
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder="Valor Máximo de Venda"
                    formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    parser={value => value ? parseFloat(value.replace(/R\$\s?|\.*/g, '')) : 0}
                  />
                </Form.Item>
              </Col>
            </Row>
          </ReportSection>

          <ReportSection>
            <Title level={5}>Colunas do Relatório</Title>
            <Form.Item name="includeColumns">
              <Checkbox.Group
                options={availableColumns}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)'
                }}
              />
            </Form.Item>
          </ReportSection>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                icon={<FiDownload />}
                loading={loading}
              >
                Gerar Relatório
              </Button>
              <Button
                icon={<FiPrinter />}
                disabled={loading}
              >
                Imprimir
              </Button>
              <Button
                icon={<FiBarChart2 />}
                disabled={loading}
              >
                Visualizar Gráficos
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </ReportCard>
    </Content>
  )
}
