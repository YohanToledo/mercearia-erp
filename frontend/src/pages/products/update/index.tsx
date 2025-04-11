import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {
    message,
} from 'antd'

import { Content } from '@/components/Content'
import { ProductForm, ProductFormValues } from '@/features/products/components/ProductForm'
import { updateProduct } from '@/features/products/api/update-product'

interface Product {
    id: string;
    name: string;
    salePrice: number;
    unitCost: number;
    profitMargin: number;
    category: string;
    stock: number;
    status: 'ACTIVED' | 'DISABLED'
}

export function ProductUpdatePage() {
    const navigate = useNavigate()

    const location = useLocation()
    const product = location.state?.record as Product;

    if (!product) {
        message.error(
            'Ops! Não foi possível carregar os dados do product.',
        )
        navigate(-1)
    }

    const [editingProductData, setEditingProductData] = useState<Product | null>(product)

    const { mutateAsync: updateProductFn } = useMutation({
        mutationFn: updateProduct,
        async onSuccess() {
            message.success('Product atualizado com sucesso')
        },
        onError() {
            message.error(
                'Ops! Ocorreu uma falha ao atualizar o Product. Tente novamente!',
            )
        },
    })

    const handleSubmit = async (values: ProductFormValues) => {
        if (editingProductData) {
            await updateProductFn({ id: editingProductData.id, ...values })
        }
        setEditingProductData(null)
        navigate(-1)
    }

    const handleCancel = () => {
        setEditingProductData(null)
        navigate(-1)
    }

    return (
        <>
            <Content>
                <ProductForm
                    initialValues={
                        editingProductData || undefined
                    }
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </Content>
        </>
    )
}
