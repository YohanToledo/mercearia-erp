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
import { getSubscribers } from '@/features/admin/subscribers/api/get-subscriber'
import { updateSubscriberStatus } from '@/features/admin/subscribers/api/update-status'

interface Subscriber {
  id: string
  name: string
  email: string
  type: 'ADMIN' | 'COMMON'
  status: 'ACTIVED' | 'DISABLED'
}

export function SubscriberListPage() {
  const navigate = useNavigate()
  const [total, setTotal] = useState(0)

  const [searchParams, setSearchParams] = useSearchParams()
  const { paginationConfig, currentPage, pageSize } = usePagination({ total })

  const search = searchParams.get('search')

  const {
    data: result,
    refetch,
    isLoading: isLoadingSubscribers,
  } = useQuery({
    queryKey: ['subscribers', currentPage, pageSize, search],
    queryFn: () => getSubscribers({
            page: currentPage,
            limit: pageSize,
            search,
          }),
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

  const { mutateAsync: updateStatusUserFn } = useMutation({
    mutationFn: updateSubscriberStatus,
    async onSuccess() {
      refetch()
      message.success('Status da empresa atualizado com sucesso')
    },
    onError() {
      message.error(
        'Ops! Não conseguimos atualizar o status da empresa, tente novamente.',
      )
    },
  })

  async function onChangeStatus(subscriberId: string, checked: boolean) {
    const status = checked ? 'ACTIVED' : 'DISABLED'
    await updateStatusUserFn({ subscriberId, status })
  }

  const handleAdd = () => {
    navigate('create')
  }

  const handleEdit = (record: Subscriber) => {
    navigate(`update/${record.id}`, { state: { record } })
  }

  const columns: ColumnsType<Subscriber> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      render: (type: Subscriber['type']) => {
        const typeLabels: Record<Subscriber['type'], string> = {
          COMMON: 'Comum',
          ADMIN: 'Administrador',
        }
        return typeLabels[type] || type
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: 'Habilitado',
          value: 'ACTIVED',
        },
        {
          text: 'Desabilitado',
          value: 'DISABLED',
        },
      ],
      defaultFilteredValue: ['ACTIVED'],
      onFilter: (value, record) => record.status === value,
      render: (_, record) => {
        const isChecked = record.status === 'ACTIVED'
        return (
          <Switch
            key={record.id}
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
            <Typography.Title level={3}>Empresas</Typography.Title>
          </Col>
        </Row>

        <SearchHeader
          buttonText="Nova empresa"
          onButtonClick={handleAdd}
          onInputChange={handleSearchChange}
        />

        <Card style={{ border: 'none' }}>
          <Table
            columns={columns}
            dataSource={result?.subscribers}
            loading={isLoadingSubscribers}
            pagination={paginationConfig}
            size="small"
          />
        </Card>
      </Content>
    </>
  )
}
