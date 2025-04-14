import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  Button,
  Card,
  Col,
  message,
  Row,
  Space,
  Switch,
  Table,
  Tooltip,
  Typography,
} from 'antd'
import { ColumnsType } from 'antd/es/table'
import { FiEdit3 } from 'react-icons/fi'

import { usePagination } from '@/hooks/usePagination'
import { Content } from '@/components/Content'
import { SearchHeader } from '@/components/SearchHeader'
import { fetchCustomers } from '@/features/customers/api/get-customer'
import { updateCustomerStatus } from '@/features/customers/api/update-status'

interface Customer {
  id: string
  name: string
  phone: string | null
  email: string | null
  status: 'ACTIVED' | 'DISABLED'
}

export function CustomerListPage() {
  const [total, setTotal] = useState(0)

  const [searchParams, setSearchParams] = useSearchParams()
  const { paginationConfig, currentPage, pageSize } = usePagination({ total })

  const search = searchParams.get('search')
  const navigate = useNavigate()

  const {
    data: result,
    isLoading: isLoadingCustomers,
    refetch,
  } = useQuery({
    queryKey: ['customers', currentPage, pageSize, search],
    queryFn: () =>
      fetchCustomers({
        page: currentPage,
        limit: pageSize,
        search,
      }),
  })

  const { mutateAsync: updateStatusCustomerFn } = useMutation({
    mutationFn: updateCustomerStatus,
    async onSuccess() {
      refetch()
      message.success('Status do tenant atualizado com sucesso')
    },
    onError() {
      message.error(
        'Ops! Não conseguimos atualizar o status do tenant, tente novamente.',
      )
    },
  })

  useEffect(() => {
    if (result?.meta?.totalCount) {
      setTotal(result.meta.totalCount)
    }
  }, [result])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchParams(prevState => ({
      ...prevState,
      search: value,
    }))
  }

  const handleAdd = () => {
    navigate('create')
  }

  const handleEdit = (record: Customer) => {
    navigate(`update/${record.id}`, { state: { record } })
  }

  async function onChangeStatus(customerId: string, checked: boolean) {
    const status = checked ? 'ACTIVED' : 'DISABLED'
    await updateStatusCustomerFn({ id: customerId, status })
  }

  const columns: ColumnsType<Customer> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '20%',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        const isChecked = record.status === 'ACTIVED'
        return (
          <Switch
            defaultChecked={isChecked}
            onChange={checked => onChangeStatus(record.id, checked)}
          />
        )
      },
    },
    {
      title: 'Opções',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Editar">
            <Button
              icon={<FiEdit3 />}
              type="text"
              onClick={() => handleEdit(record)}
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Content>
        <Row>
          <Col>
            <Typography.Title level={3}>Clientes</Typography.Title>
          </Col>
        </Row>

        <SearchHeader
          buttonText="Novo cliente"
          onButtonClick={handleAdd}
          onInputChange={handleSearchChange}
        />

        <Card style={{ border: 'none' }}>
          <Table
            columns={columns}
            dataSource={result?.customers}
            loading={isLoadingCustomers}
            pagination={paginationConfig}
            size="small"
          />
        </Card>
      </Content>
    </>
  )
}
