import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import {
  message,
} from 'antd'

import { Content } from '@/components/Content'
import { SubscriberForm } from '@/features/admin/subscribers/components/Form'
import { SubscriberFormValues } from '@/features/admin/subscribers/components/Form'
import { updateSubscriber } from '@/features/admin/subscribers/api/update-subscriber'
import { useLocation, useNavigate } from 'react-router-dom'

interface Subscriber {
  id: string
  name: string
  email: string
  type: 'ADMIN' | 'COMMON'
  status: 'ACTIVED' | 'DISABLED'
}

export function SubscriberUpdatePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const subscriber = location.state?.record as Subscriber

  if (!subscriber) {
    message.error(
      'Ops! Não foi possível carregar os dados do subscriber.',
    )
    navigate(-1)
  }

  const [editingSubscriberData, setEditingSubscriberData] = useState<Subscriber | null>(subscriber)

  const { mutateAsync: updateSubscriberFn } = useMutation({
    mutationFn: updateSubscriber,
    async onSuccess() {
      message.success('Empresa atualizado com sucesso')
    },
    onError() {
      message.error(
        'Ops! Ocorreu uma falha ao atualizar o empresa. Tente novamente!',
      )
    },
  })


  const handleSubmit = async (values: SubscriberFormValues) => {
    if (editingSubscriberData) {
      await updateSubscriberFn({ id: editingSubscriberData.id, ...values })
    }
    setEditingSubscriberData(null)
    navigate(-1)
  }

  const handleCancel = () => {
    setEditingSubscriberData(null)
    navigate(-1)
  }

  return (
    <>
      <Content>
        <SubscriberForm
          initialValues={
            editingSubscriberData || undefined
          }
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Content>
    </>
  )
}
