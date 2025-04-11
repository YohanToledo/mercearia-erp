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
import { fetchProducts } from '@/features/products/api/get-product'
import { updateProductStatus } from '@/features/products/api/update-status'

interface Product {
  id: string
  name: string
  salePrice: number
  stock: number
  status: 'ACTIVED' | 'DISABLED'
}

export function ProductListPage() {
  const [total, setTotal] = useState(0)

  const [searchParams, setSearchParams] = useSearchParams()
  const { paginationConfig, currentPage, pageSize } = usePagination({ total })

  const search = searchParams.get('search')
  const navigate = useNavigate()

  const {
    data: result,
    isLoading: isLoadingProducts,
    refetch,
  } = useQuery({
    queryKey: ['products', currentPage, pageSize, search],
    queryFn: () =>
      fetchProducts({
        page: currentPage,
        limit: pageSize,
        search,
      }),
  })

  const { mutateAsync: updateStatusProductFn } = useMutation({
    mutationFn: updateProductStatus,
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

  const handleEdit = (record: Product) => {
    navigate(`update/${record.id}`, { state: { record } })
  }

  async function onChangeStatus(productId: string, checked: boolean) {
    const status = checked ? 'ACTIVED' : 'DISABLED'
    await updateStatusProductFn({ id: productId, status })
  }

  const columns: ColumnsType<Product> = [
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
      title: 'Preço',
      dataIndex: 'salePrice',
      key: 'salePrice',
    },
    {
      title: 'Estoque',
      dataIndex: 'stock',
      key: 'stock',
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
            <Typography.Title level={3}>Produtos</Typography.Title>
          </Col>
        </Row>

        <SearchHeader
          buttonText="Novo produto"
          onButtonClick={handleAdd}
          onInputChange={handleSearchChange}
        />

        <Card style={{ border: 'none' }}>
          <Table
            columns={columns}
            dataSource={result?.products}
            loading={isLoadingProducts}
            pagination={paginationConfig}
            size="small"
          />
        </Card>
      </Content>
    </>
  )
}
