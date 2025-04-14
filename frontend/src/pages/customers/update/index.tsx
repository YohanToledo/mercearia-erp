import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {
    message,
} from 'antd'

import { Content } from '@/components/Content'
import { CustomerForm, CustomerFormValues } from '@/features/customers/components/CustomerForm'
import { updateCustomer } from '@/features/customers/api/update-customer'

interface Customer {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    status: 'ACTIVED' | 'DISABLED'
}

export function CustomerUpdatePage() {
    const navigate = useNavigate()

    const location = useLocation()
    const customer = location.state?.record as Customer;

    if (!customer) {
        message.error(
            'Ops! Não foi possível carregar os dados do cliente.',
        )
        navigate(-1)
    }

    const [editingCustomerData, setEditingCustomerData] = useState<Customer | null>(customer)

    const { mutateAsync: updateCustomerFn } = useMutation({
        mutationFn: updateCustomer,
        async onSuccess() {
            message.success('Customer atualizado com sucesso')
        },
        onError() {
            message.error(
                'Ops! Ocorreu uma falha ao atualizar o Customer. Tente novamente!',
            )
        },
    })

    const handleSubmit = async (values: CustomerFormValues) => {
        if (editingCustomerData) {
            await updateCustomerFn({ id: editingCustomerData.id, ...values })
        }
        setEditingCustomerData(null)
        navigate(-1)
    }

    const handleCancel = () => {
        setEditingCustomerData(null)
        navigate(-1)
    }

    return (
        <>
            <Content>
                <CustomerForm
                    initialValues={
                        editingCustomerData || undefined
                    }
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </Content>
        </>
    )
}
