import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {
    message,
    Typography,
} from 'antd'

import { Content } from '@/components/Content'
import { ExpenseForm, ExpenseFormValues } from '@/features/expenses/components/ExpenseForm'
import { createExpense } from '@/features/expenses/api/create-expense'

export function ExpenseCreatePage() {
    const navigate = useNavigate()
    const { mutateAsync: createExpenseFn } = useMutation({
        mutationFn: createExpense,
        async onSuccess() {
            message.success('Despesa criado com sucesso')
        },
        onError() {
            message.error('Ops! Ocorreu uma falha ao criar a despesa. Tente novamente!')
        },
    })

    const handleSubmit = async (values: ExpenseFormValues) => {
        await createExpenseFn(values)
        navigate(-1)
    }

    const handleCancel = () => {
        navigate(-1)
    }

    return (
        <>
            <Content>
                <Typography.Title level={2}>Cadastrar Nova Despesa</Typography.Title>
                <ExpenseForm 
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </Content>
        </>
    )
}
