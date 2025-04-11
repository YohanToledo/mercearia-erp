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
  Space 
} from 'antd'
import { 
  FiDownload, 
  FiPrinter, 
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

interface ReportFilters {
  dateRange?: [string, string]
  reportType: string
  includeColumns: string[]
  status?: 'ACTIVED' | 'DISABLED' | 'ALL'
  minStock?: number
  maxStock?: number
}

export function ProductReportsPage() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  // Available report types
  const reportTypes = [
    { 
      value: 'inventory', 
      label: 'Relatório de Inventário' 
    },
    { 
      value: 'sales', 
      label: 'Relatório de Vendas por Produto' 
    },
    { 
      value: 'pricing', 
      label: 'Relatório de Precificação' 
    },
    { 
      value: 'performance', 
      label: 'Relatório de Desempenho' 
    }
  ]

  // Available columns to include in report
  const availableColumns = [
    { 
      value: 'id', 
      label: 'ID do Produto' 
    },
    { 
      value: 'name', 
      label: 'Nome do Produto' 
    },
    { 
      value: 'price', 
      label: 'Preço' 
    },
    { 
      value: 'stock', 
      label: 'Estoque Atual' 
    },
    { 
      value: 'status', 
      label: 'Status' 
    },
    { 
      value: 'totalSales', 
      label: 'Total de Vendas' 
    },
    { 
      value: 'avgPrice', 
      label: 'Preço Médio' 
    }
  ]

  const handleGenerateReport = async (values: ReportFilters) => {
    setLoading(true)
    try {
      // Simulated report generation logic
      console.log('Report Filters:', values)
      
      // Here you would typically call an API to generate the report
      message.success('Relatório gerado com sucesso!')
    } catch (error) {
      message.error('Erro ao gerar relatório')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Content>
      <Row>
        <Col>
          <Title level={3}>Gerador de Relatórios de Produtos</Title>
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
              <Col span={12}>
                <Form.Item name="status">
                  <Select
                    placeholder="Status do Produto"
                    options={[
                      { value: 'ALL', label: 'Todos' },
                      { value: 'ACTIVED', label: 'Ativos' },
                      { value: 'DISABLED', label: 'Inativos' }
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Space>
                  <Form.Item name="minStock">
                    <Select 
                      style={{ width: 150 }}
                      placeholder="Estoque Mínimo"
                      options={[
                        { value: 0, label: 'Sem Mínimo' },
                        { value: 10, label: 'Menos de 10' },
                        { value: 50, label: 'Menos de 50' },
                        { value: 100, label: 'Menos de 100' }
                      ]}
                    />
                  </Form.Item>
                </Space>
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
            </Space>
          </Form.Item>
        </Form>
      </ReportCard>
    </Content>
  )
}
