import { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Space } from 'antd'

interface SubscriberFormProps {
  initialValues?: SubscriberFormValues
  onSubmit: (values: SubscriberFormValues) => void
  onCancel: () => void
}

export interface SubscriberFormValues {
  name: string
  email: string
  type: 'ADMIN' | 'COMMON'
}

export function SubscriberForm({
  initialValues,
  onSubmit,
  onCancel,
}: SubscriberFormProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [initialValues, form])

  const handleFinish = async (values: SubscriberFormValues) => {
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
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Por favor, insira o email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tipo da empresa"
        name="type"
        rules={[{ required: true, message: 'Por favor, selecione o tipo de empresa!' }]}
      >
        <Select>
          <Select.Option value="ADMIN">Administrador</Select.Option>
          <Select.Option value="COMMON">Comum</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button onClick={onCancel}>Cancelar</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Salvar empresa
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
