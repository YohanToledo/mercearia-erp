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
import { fetchSuppliers } from '@/features/suppliers/api/get-supplier'
import { updateSupplierStatus } from '@/features/suppliers/api/update-status'

interface Supplier {
  id: string
  name: string
  description: string | null
  phone: string | null
  email: string | null
  status: 'ACTIVE' | 'INACTIVE'
}

export function SupplierListPage() {
  const [total, setTotal] = useState(0)

  const [searchParams, setSearchParams] = useSearchParams()
  const { paginationConfig, currentPage, pageSize } = usePagination({ total })

  const search = searchParams.get('search')
  const navigate = useNavigate()

  const {
    data: result,
    isLoading: isLoadingSuppliers,
    refetch,
  } = useQuery({
    queryKey: ['suppliers', currentPage, pageSize, search],
    queryFn: () =>
      fetchSuppliers({
        page: currentPage,
        limit: pageSize,
        search,
      }),
  })

  const { mutateAsync: updateStatusSupplierFn } = useMutation({
    mutationFn: updateSupplierStatus,
    async onSuccess() {
      refetch()
      message.success('Status do fornecedor atualizado com sucesso')
    },
    onError() {
      message.error(
        'Ops! Não conseguimos atualizar o status do fornecedor, tente novamente.',
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

  const handleEdit = (record: Supplier) => {
    navigate(`update/${record.id}`, { state: { record } })
  }

  async function onChangeStatus(supplierId: string, checked: boolean) {
    const status = checked ? 'ACTIVE' : 'INACTIVE'
    await updateStatusSupplierFn({ id: supplierId, status })
  }

  const columns: ColumnsType<Supplier> = [
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
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
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
        const isChecked = record.status === 'ACTIVE'
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
            <Typography.Title level={3}>Fornecedores</Typography.Title>
          </Col>
        </Row>

        <SearchHeader
          buttonText="Novo fornecedor"
          onButtonClick={handleAdd}
          onInputChange={handleSearchChange}
        />

        <Card style={{ border: 'none' }}>
          <Table
            columns={columns}
            dataSource={result?.suppliers}
            loading={isLoadingSuppliers}
            pagination={paginationConfig}
            size="small"
          />
        </Card>
      </Content>
    </>
  )
}
