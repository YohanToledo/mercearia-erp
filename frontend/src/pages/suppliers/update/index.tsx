import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {
    message,
} from 'antd'

import { Content } from '@/components/Content'
import { SupplierForm, SupplierFormValues } from '@/features/suppliers/components/SupplierForm'
import { updateSupplier } from '@/features/suppliers/api/update-supplier'

interface Supplier {
    id: string;
    name: string;
    description?: string
    phone?: string;
    email?: string;
    status: 'ACTIVE' | 'INACTIVE'
}

export function SupplierUpdatePage() {
    const navigate = useNavigate()

    const location = useLocation()
    const supplier = location.state?.record as Supplier;

    if (!supplier) {
        message.error(
            'Ops! Não foi possível carregar os dados do fornecedor.',
        )
        navigate(-1)
    }

    const [editingSupplierData, setEditingSupplierData] = useState<Supplier | null>(supplier)

    const { mutateAsync: updateSupplierFn } = useMutation({
        mutationFn: updateSupplier,
        async onSuccess() {
            message.success('Supplier atualizado com sucesso')
        },
        onError() {
            message.error(
                'Ops! Ocorreu uma falha ao atualizar o Supplier. Tente novamente!',
            )
        },
    })

    const handleSubmit = async (values: SupplierFormValues) => {
        if (editingSupplierData) {
            await updateSupplierFn({ id: editingSupplierData.id, ...values })
        }
        setEditingSupplierData(null)
        navigate(-1)
    }

    const handleCancel = () => {
        setEditingSupplierData(null)
        navigate(-1)
    }

    return (
        <>
            <Content>
                <SupplierForm
                    initialValues={
                        editingSupplierData || undefined
                    }
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </Content>
        </>
    )
}
