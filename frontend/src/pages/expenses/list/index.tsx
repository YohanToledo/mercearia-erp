import { useState, useEffect } from 'react'
import {
    Table,
    Input,
    Select,
    DatePicker,
    Card,
    Row,
    Col,
    Typography,
    Tag
} from 'antd'
import {
    FiSearch,
    FiCalendar,
    FiTag,
    FiDollarSign
} from 'react-icons/fi'
import styled from 'styled-components'
import locale from 'antd/es/date-picker/locale/pt_BR'
import dayjs, { Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { Content } from '@/components/Content'
import { useQuery } from '@tanstack/react-query'
import { usePagination } from '@/hooks/usePagination'
import { fetchExpenses } from '@/features/expenses/api/get-product'

dayjs.extend(isBetween);

const { RangePicker } = DatePicker
const { Text } = Typography

const FilterContainer = styled(Card)`
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

const FilterIcon = styled.span`
  margin-right: 8px;
  display: flex;
  align-items: center;
`

export interface Expense {
    id: string
    description: string
    amount: number
    category: string
    date: string
    paymentMethod: string
    status: 'PAID' | 'PENDING'
    invoiceNumber?: string
    notes?: string
}

export function ExpenseListPage() {
    const today = dayjs()
    const startOfDay = today.startOf('day')
    const endOfDay = today.endOf('day')

    const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([])
    const [filters, setFilters] = useState<{
        dateRange: [Dayjs | null, Dayjs | null], category: string | undefined, searchText: string
    }>({
        dateRange: [startOfDay, endOfDay] as [Dayjs | null, Dayjs | null],
        category: undefined,
        searchText: ''
    })

    const [total, setTotal] = useState(0)
    const { paginationConfig, currentPage, pageSize } = usePagination({ total })
    const {
        data: expensesResult,
        isLoading: isLoadingExpenses,
        // refetch,
    } = useQuery({
        queryKey: ['expenses', currentPage, pageSize],
        queryFn: () =>
            fetchExpenses({
                page: currentPage,
                limit: pageSize,
            }),
    })

    useEffect(() => {
        if (expensesResult?.meta?.totalCount) {
            setTotal(expensesResult.meta.totalCount)
        }
    }, [expensesResult])

    // useEffect(() => {
    //     if (result?.expenses) {
    //         const filtered = result.expenses.filter(expense =>
    //             expense.description.toLowerCase().includes(filters.searchText.toLowerCase()),
    //         )
    //         setFilteredExpenses(filtered)
    //     }
    // }, [result, search])

    // Simulação de busca de dados (substitua por sua chamada de API real)
    // useEffect(() => {
    //     const fetchExpenses = async () => {
    //         setLoading(true)
    //         try {
    //             // Simulação de dados
    //             const mockExpenses: Expense[] = [
    //                 {
    //                     id: '1',
    //                     description: 'Aluguel do escritório',
    //                     amount: 2500.00,
    //                     category: 'ADMINISTRATIVO',
    //                     date: '2024-03-27',
    //                     paymentMethod: 'TRANSFERENCIA',
    //                     status: 'PAID'
    //                 },
    //                 {
    //                     id: '2',
    //                     description: 'Material de escritório',
    //                     amount: 350.50,
    //                     category: 'OPERACIONAL',
    //                     date: '2024-03-27',
    //                     paymentMethod: 'CARTAO_CREDITO',
    //                     status: 'PENDING'
    //                 }
    //                 // Adicione mais despesas mockadas conforme necessário
    //             ]
    //             setExpenses(mockExpenses)
    //             setFilteredExpenses(mockExpenses)
    //         } catch (error) {
    //             console.error('Erro ao buscar despesas', error)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     fetchExpenses()
    // }, [])

    // Aplicar filtros
    useEffect(() => {
        let result = expensesResult?.expenses || []
        // Filtro de data
        if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
            result = result.filter(expense => {
                const expenseDate = dayjs(expense.date)
                return expenseDate.isBetween(filters.dateRange[0], filters.dateRange[1], 'day', '[]')
            })
        }

        // Filtro de categoria
        if (filters.category) {
            result = result.filter(expense => expense.category === filters.category)
        }

        // Filtro de texto
        if (filters.searchText) {
            const searchText = filters.searchText.toLowerCase()
            result = result.filter(expense =>
                expense.description.toLowerCase().includes(searchText) ||
                expense.invoiceNumber?.toLowerCase().includes(searchText)
            )
        }

        setFilteredExpenses(result)
    }, [expensesResult, filters])

    // Colunas da tabela
    const columns = [
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
            render: (text: string) => <Text strong>{text}</Text>
        },
        {
            title: 'Valor',
            dataIndex: 'amount',
            key: 'amount',
            render: (value: number) => (
                <Text type="success">
                    <FiDollarSign /> R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
            )
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            key: 'category',
            render: (category: string) => {
                const categoryMap = {
                    'ADMINISTRATIVO': { color: 'blue', label: 'Administrativo' },
                    'OPERACIONAL': { color: 'green', label: 'Operacional' },
                    'MARKETING': { color: 'purple', label: 'Marketing' },
                    'RH': { color: 'orange', label: 'Recursos Humanos' },
                    'OUTROS': { color: 'gray', label: 'Outros' }
                }
                const categoryInfo = categoryMap[category as keyof typeof categoryMap] || { color: 'default', label: category }
                return <Tag color={categoryInfo.color}>{categoryInfo.label}</Tag>
            }
        },
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'date',
            render: (date: string) => dayjs(date).format('DD/MM/YYYY')
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: 'PAID' | 'PENDING') => {
                const statusMap = {
                    'PAID': { color: 'green', label: 'Pago' },
                    'PENDING': { color: 'orange', label: 'Pendente' }
                }
                const statusInfo = statusMap[status]
                return <Tag color={statusInfo.color}>{statusInfo.label}</Tag>
            }
        }
    ]

    return (
        <Content>
            <FilterContainer>
                <Row gutter={16} align="middle">
                    <Col span={8}>
                        <FilterIcon><FiSearch /></FilterIcon>
                        <Input
                            placeholder="Buscar despesas"
                            value={filters.searchText}
                            onChange={(e) => setFilters(prev => ({ ...prev, searchText: e.target.value }))}
                            allowClear
                        />
                    </Col>
                    <Col span={8}>
                        <FilterIcon><FiTag /></FilterIcon>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Categoria"
                            value={filters.category}
                            onChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                            allowClear
                        >
                            <Select.Option value="ADMINISTRATIVO">Administrativo</Select.Option>
                            <Select.Option value="OPERACIONAL">Operacional</Select.Option>
                            <Select.Option value="MARKETING">Marketing</Select.Option>
                            <Select.Option value="RH">Recursos Humanos</Select.Option>
                            <Select.Option value="OUTROS">Outros</Select.Option>
                        </Select>
                    </Col>
                    <Col span={8}>
                        <FilterIcon><FiCalendar /></FilterIcon>
                        <RangePicker
                            locale={locale}
                            value={filters.dateRange}
                            onChange={(dates) => {
                                // Tratar o caso de dates ser null ou um array com elementos undefined
                                if (dates && dates[0] && dates[1]) {
                                    setFilters(prev => ({
                                        ...prev,
                                        dateRange: dates
                                    }))
                                }
                            }}
                            style={{ width: '100%' }}
                            format="DD/MM/YYYY"
                        />
                    </Col>
                </Row>
            </FilterContainer>

            <Table
                columns={columns}
                dataSource={filteredExpenses}
                loading={isLoadingExpenses}
                rowKey="id"
                pagination={paginationConfig}
            />
        </Content>
    )
}