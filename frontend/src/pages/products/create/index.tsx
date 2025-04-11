import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {
    message,
    Typography,
} from 'antd'

import { Content } from '@/components/Content'
import { ProductForm, ProductFormValues } from '@/features/products/components/ProductForm'
import { createProduct } from '@/features/products/api/create-product'

export function ProductCreatePage() {
    const navigate = useNavigate()
    const { mutateAsync: createProductFn } = useMutation({
        mutationFn: createProduct,
        async onSuccess() {
            message.success('Produto criado com sucesso')
        },
        onError() {
            message.error('Ops! Ocorreu uma falha ao criar o produto. Tente novamente!')
        },
    })

    const handleSubmit = async (values: ProductFormValues) => {
        await createProductFn(values)
        navigate(-1)
    }

    const handleCancel = () => {
        navigate(-1)
    }

    return (
        <>
            <Content>
                <Typography.Title level={2}>Cadastrar Novo Produto</Typography.Title>
                <ProductForm 
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </Content>
        </>
    )
}
