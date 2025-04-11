import { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Space } from 'antd'

interface SaleFormProps {
  initialValues?: SaleFormValues
  onSubmit: (values: SaleFormValues) => void
  onCancel: () => void
}

export interface SaleFormValues {
  name: string
  price: number
  stock: number
  status: 'ACTIVED' | 'DISABLED'
}

export function SaleForm({
  initialValues,
  onSubmit,
  onCancel,
}: SaleFormProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [initialValues, form])

  const handleFinish = async (values: SaleFormValues) => {
    setLoading(true)
    try {
      await onSubmit(values)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={initialValues}
      requiredMark={false}
    >
      <Form.Item
        label="Nome"
        name="name"
        rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
      >
        <Input size="large"/>
      </Form.Item>
      <Form.Item
        label="Preço"
        name="price"
        rules={[{ required: true, message: 'Por favor, informe o preço!' }]}
      >
        <Input type="number" size="large"/>
      </Form.Item>
      <Form.Item
        label="Estoque"
        name="stock"
        rules={[{ required: true, message: 'Por favor, informe o estoque!' }]}
      >
        <Input type="number" size="large"/>
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: 'Por favor, selecione o status!' }]}
      >
        <Select size="large">
          <Select.Option value="ACTIVED">Ativo</Select.Option>
          <Select.Option value="DISABLED">Inativo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Space size="large">
          <Button onClick={onCancel} size="large" >Cancelar</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
            size="large"
          >
            Salvar produto
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
