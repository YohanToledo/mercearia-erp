import { useMutation } from '@tanstack/react-query'
import {
  message,
} from 'antd'

import { Content } from '@/components/Content'
import { SubscriberForm } from '@/features/admin/subscribers/components/Form'
import { createSubscriber } from '@/features/admin/subscribers/api/create-subscriber'
import { SubscriberFormValues } from '@/features/admin/subscribers/components/Form'
import { useNavigate } from 'react-router-dom'

export function SubscriberCreatePage() {
  const navigate = useNavigate()

  const { mutateAsync: createSubscriberFn } = useMutation({
    mutationFn: createSubscriber,
    async onSuccess() {
      message.success('Empresa criado com sucesso')
    },
    onError() {
      message.error('Ops! Ocorreu uma falha ao criar empresa. Tente novamente!')
    },
  })

  const handleSubmit = async (values: SubscriberFormValues) => {
    await createSubscriberFn(values)
    navigate(-1)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <>
      <Content>
        <SubscriberForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Content>
    </>
  )
}
