import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {
    message,
    Typography,
} from 'antd'

import { Content } from '@/components/Content'
import { SupplierForm, SupplierFormValues } from '@/features/suppliers/components/SupplierForm'
import { createSupplier } from '@/features/suppliers/api/create-supplier'

export function SupplierCreatePage() {
    const navigate = useNavigate()
    const { mutateAsync: createSupplierFn } = useMutation({
        mutationFn: createSupplier,
        async onSuccess() {
            message.success('Fornecedor criado com sucesso')
        },
        onError() {
            message.error('Ops! Ocorreu uma falha ao criar o fornecedor. Tente novamente!')
        },
    })

    const handleSubmit = async (values: SupplierFormValues) => {
        await createSupplierFn(values)
        navigate(-1)
    }

    const handleCancel = () => {
        navigate(-1)
    }

    return (
        <>
            <Content>
                <Typography.Title level={2}>Cadastrar Novo Cliente</Typography.Title>
                <SupplierForm 
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </Content>
        </>
    )
}
