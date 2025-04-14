import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {
    message,
    Typography,
} from 'antd'

import { Content } from '@/components/Content'
import { CustomerForm, CustomerFormValues } from '@/features/customers/components/CustomerForm'
import { createCustomer } from '@/features/customers/api/create-customer'

export function CustomerCreatePage() {
    const navigate = useNavigate()
    const { mutateAsync: createCustomerFn } = useMutation({
        mutationFn: createCustomer,
        async onSuccess() {
            message.success('Cliente criado com sucesso')
        },
        onError() {
            message.error('Ops! Ocorreu uma falha ao criar o cliente. Tente novamente!')
        },
    })

    const handleSubmit = async (values: CustomerFormValues) => {
        await createCustomerFn(values)
        navigate(-1)
    }

    const handleCancel = () => {
        navigate(-1)
    }

    return (
        <>
            <Content>
                <Typography.Title level={2}>Cadastrar Novo Cliente</Typography.Title>
                <CustomerForm 
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </Content>
        </>
    )
}
