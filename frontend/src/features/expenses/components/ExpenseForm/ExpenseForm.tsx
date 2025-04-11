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
  DatePicker
} from 'antd'
import {
  FiDollarSign,
  FiCalendar,
  FiClipboard,
  FiTag,
  FiFile,
  FiList
} from 'react-icons/fi'
import locale from 'antd/es/date-picker/locale/pt_BR'
import * as S from './ExpenseFormStyle'

export interface ExpenseFormValues {
  description: string
  amount: number
  category: string
  date: any
  paymentMethod: string
  status: 'PAID' | 'PENDING'
  invoiceNumber?: string
  notes?: string
}

export function ExpenseForm({
  initialValues,
  onSubmit,
  onCancel,
}: {
  initialValues?: ExpenseFormValues
  onSubmit: (values: ExpenseFormValues) => void
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

  const handleFinish = async (values: ExpenseFormValues) => {
    setLoading(true)
    try {
      await onSubmit(values)
    } finally {
      setLoading(false)
    }
  }

  return (
    <S.FormCard>
      <S.StyledForm
        form={form}
        layout="vertical"
        onFinish={handleFinish as (values: unknown) => void}
        initialValues={initialValues}
        requiredMark={false}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<><FiClipboard /> Descrição da Despesa</>}
              name="description"
              rules={[{ required: true, message: 'Por favor, insira a descrição!' }]}
            >
              <Input size="large" placeholder="Descrição detalhada da despesa" />
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
                <Select.Option value="OPERACIONAL">Despesas Operacionais</Select.Option>
                <Select.Option value="ADMINISTRATIVO">Despesas Administrativas</Select.Option>
                <Select.Option value="MARKETING">Marketing</Select.Option>
                <Select.Option value="RH">Recursos Humanos</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label={<><FiDollarSign /> Valor da Despesa</>}
              name="amount"
              rules={[{ required: true, message: 'Informe o valor da despesa!' }]}
            >
              <InputNumber
                size="large"
                style={{ width: '100%' }}
                min={0}
                precision={2}
                placeholder="R$ 0,00"
                // formatter={(value) => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                // parser={(value) => value ? value.replace(/\$\s?|(,*)/g, '') : ''}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<><FiCalendar /> Data da Despesa</>}
              name="date"
              rules={[{ required: true, message: 'Selecione a data da despesa!' }]}
            >
              <DatePicker
                size="large"
                style={{ width: '100%' }}
                locale={locale}
                format="DD/MM/YYYY"
                placeholder="Selecione a data"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<><FiList /> Método de Pagamento</>}
              name="paymentMethod"
              rules={[{ required: true, message: 'Selecione o método de pagamento!' }]}
            >
              <Select
                size="large"
                placeholder="Selecione o método"
                defaultValue="DINHEIRO"
              >
                <Select.Option value="DINHEIRO">Dinheiro</Select.Option>
                <Select.Option value="CARTAO_CREDITO">Cartão de Crédito</Select.Option>
                <Select.Option value="CARTAO_DEBITO">Cartão de Débito</Select.Option>
                <Select.Option value="TRANSFERENCIA">Transferência Bancária</Select.Option>
                <Select.Option value="PIX">PIX</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label={<><FiFile /> Número da Nota/Recibo</>}
              name="invoiceNumber"
            >
              <Input
                size="large"
                placeholder="Número do documento fiscal"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<><FiTag /> Status</>}
              name="status"
              rules={[{ required: true, message: 'Por favor, selecione o status!' }]}
            >
              <Select
                size="large"
                placeholder="Selecione o status"
                defaultValue="PENDING"
              >
                <Select.Option value="PENDING">Pendente</Select.Option>
                <Select.Option value="PAID">Pago</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={<><FiClipboard /> Observações</>}
              name="notes"
            >
              <Input.TextArea
                size="large"
                rows={3}
                placeholder="Observações adicionais sobre a despesa"
              />
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
              Salvar Despesa
            </Button>
          </Space>
        </Form.Item>
      </S.StyledForm>
    </S.FormCard>
  )
}