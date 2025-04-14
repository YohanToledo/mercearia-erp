import { useEffect, useState } from 'react'
import { 
  Button, 
  Form, 
  Input, 
  Select, 
  Space, 
  Row, 
  Col, 
} from 'antd'
import { 
  FiTag, 
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

export interface CustomerFormValues {
  name: string
  phone?: string
  email?: string
  status: 'ACTIVED' | 'DISABLED'
}

export function CustomerForm({
  initialValues,
  onSubmit,
  onCancel,
}: {
  initialValues?: CustomerFormValues
  onSubmit: (values: CustomerFormValues) => void
  onCancel: () => void
}) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [initialValues, form])

  const handleFinish = async (values: CustomerFormValues) => {
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
              label={<><FiClipboard /> Nome do Cliente</>}
              name="name"
              rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
            >
              <Input size="large" placeholder="Nome do cliente" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<><FiClipboard /> Telefone</>}
              name="phone"
            >
              <Input 
                size="large" 
                placeholder="Telefone para contato"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<><FiClipboard /> Email</>}
              name="email"
            >
              <Input 
                size="large" 
                placeholder="Email para contato"
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
              Salvar Cadastro
            </Button>
          </Space>
        </Form.Item>
      </StyledForm>
    </FormCard>
  )
}