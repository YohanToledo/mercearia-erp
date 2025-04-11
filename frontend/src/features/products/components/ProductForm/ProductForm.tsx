import { useEffect, useState } from 'react'
import { 
  Button, 
  Form, 
  Input, 
  Select, 
  Space, 
  Row, 
  Col, 
  InputNumber, 
} from 'antd'
import { 
  FiBox, 
  FiTag, 
  FiDollarSign, 
  FiTrendingUp, 
  FiPercent,
  FiClipboard
} from 'react-icons/fi'
import styled from 'styled-components'

const StyledForm = styled(Form)`
  .ant-form-item-label {
    display: flex;
    align-items: center;
  }
  
  .ant-form-item-label label {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* Estilo global para inputs */
  .ant-input, 
  .ant-input-number,
  .ant-select-selector {
    background-color: #f5f5f5 !important;
    border: 1px solid #e0e0e0 !important;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05) !important;
    transition: all 0.3s ease;
  }

  /* Estado de foco */
  .ant-input:focus, 
  .ant-input-number:focus,
  .ant-select-focused .ant-select-selector {
    border-color: #1890ff !important;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
    background-color: white !important;
  }

  /* Hover state */
  .ant-input:hover, 
  .ant-input-number:hover,
  .ant-select:hover .ant-select-selector {
    border-color: #1890ff !important;
  }

  /* Estilo para labels */
  .ant-form-item-label {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  
  .ant-form-item-label label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #333;
    font-weight: 500;
  }
`

const FormCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`

export interface ProductFormValues {
  name: string
  unitCost: number
  salePrice: number
  profitMargin: number
  stock: number
  status: 'ACTIVED' | 'DISABLED'
  category: string
  barcode?: string
  description?: string
  minStockLevel?: number
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
}

export function ProductForm({
  initialValues,
  onSubmit,
  onCancel,
}: {
  initialValues?: ProductFormValues
  onSubmit: (values: ProductFormValues) => void
  onCancel: () => void
}) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  // Calculate sale price based on unit cost and profit margin
  const calculateSalePrice = () => {
    const unitCost = form.getFieldValue('unitCost') || 0
    const profitMargin = form.getFieldValue('profitMargin') || 0
    
    if (unitCost && profitMargin) {
      const salePrice = unitCost * (1 + profitMargin / 100)
      form.setFieldsValue({ salePrice: Number(salePrice.toFixed(2)) })
    }
  }

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [initialValues, form])

  const handleFinish = async (values: ProductFormValues) => {
    setLoading(true)
    try {
      await onSubmit(values)
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormCard>
      <StyledForm
        form={form}
        layout="vertical"
        onFinish={handleFinish as (values: unknown) => void}
        initialValues={initialValues}
        requiredMark={false}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<><FiClipboard /> Nome do Produto</>}
              name="name"
              rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
            >
              <Input size="large" placeholder="Nome do produto" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<><FiTag /> Categoria</>}
              name="category"
              rules={[{ required: true, message: 'Por favor, selecione a categoria!' }]}
            >
              <Select 
                size="large" 
                placeholder="Selecione a categoria"
                defaultValue="OUTROS"
              >
                <Select.Option value="OUTROS">Outros</Select.Option>
                <Select.Option value="ACESSORIOS">Acessórios</Select.Option>
                <Select.Option value="ROUPAS">Roupas</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label={<><FiDollarSign /> Custo Unitário</>}
              name="unitCost"
              rules={[{ required: true, message: 'Informe o custo unitário!' }]}
            >
              <InputNumber 
                size="large" 
                style={{ width: '100%' }}
                min={0} 
                precision={2} 
                placeholder="R$ 0,00"
                onChange={calculateSalePrice}
                // formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                // parser={(value) => parseFloat(value?.replace(/[R$\s.]/g, '').replace(',', '.') || '0')}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<><FiPercent /> Margem de Lucro</>}
              name="profitMargin"
              rules={[{ required: true, message: 'Informe a margem de lucro!' }]}
            >
              <InputNumber 
                size="large" 
                style={{ width: '100%' }}
                min={0} 
                max={100} 
                formatter={value => `${value}%`}
                // parser={(value) => parseFloat(value?.replace('%', '') || '0')}
                placeholder="% de lucro"
                onChange={calculateSalePrice}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<><FiTrendingUp /> Preço de Venda</>}
              name="salePrice"
              rules={[{ required: true, message: 'Informe o preço de venda!' }]}
            >
              <InputNumber 
                size="large" 
                style={{ width: '100%' }}
                min={0} 
                precision={2} 
                placeholder="R$ 0,00"
                formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                // parser={(value) => parseFloat(value?.replace(/[R$\s.]/g, '').replace(',', '.') || '0').toString()}
                readOnly
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label={<><FiBox /> Estoque</>}
              name="stock"
              rules={[
                { required: true, message: 'Informe o estoque!' },
                { pattern: /^[0-9]+$/, message: 'O estoque deve ser um número inteiro positivo!' },
              ]}
            >
              <InputNumber 
                size="large" 
                style={{ width: '100%' }}
                min={0} 
                placeholder="Quantidade em estoque"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<><FiBox /> Estoque Mínimo</>}
              name="minStockLevel"
            >
              <InputNumber 
                size="large" 
                style={{ width: '100%' }}
                min={0} 
                placeholder="Nível mínimo de estoque"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<><FiClipboard /> Código de Barras</>}
              name="barcode"
            >
              <Input 
                size="large" 
                placeholder="Código de barras"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<><FiClipboard /> Descrição</>}
              name="description"
            >
              <Input.TextArea 
                size="large" 
                rows={3} 
                placeholder="Descrição detalhada do produto"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<><FiTag /> Status</>}
              name="status"
              rules={[{ required: true, message: 'Por favor, selecione o status!' }]}
            >
              <Select 
                size="large" 
                placeholder="Selecione o status"
                defaultValue="ACTIVED"
              >
                <Select.Option value="ACTIVED">Ativo</Select.Option>
                <Select.Option value="DISABLED">Inativo</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Space size="large">
            <Button 
              onClick={onCancel} 
              size="large"
            >
              Cancelar
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
              size="large"
            >
              Salvar Produto
            </Button>
          </Space>
        </Form.Item>
      </StyledForm>
    </FormCard>
  )
}