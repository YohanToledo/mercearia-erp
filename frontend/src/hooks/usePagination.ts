import { TablePaginationConfig } from 'antd/es/table'
import { useSearchParams } from 'react-router-dom'

interface UsePaginationProps {
  total: number | undefined
  defaultPageSize?: number
}

export const usePagination = ({
  total,
  defaultPageSize = 20,
}: UsePaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const pageSize = Number(searchParams.get('limit')) || defaultPageSize

  const setPageSize = (size: number) => {
    setSearchParams(params => {
      params.set('limit', size.toString())
      params.set('page', '1')
      return params
    })
  }

  const paginationConfig: TablePaginationConfig = {
    current: currentPage,
    total,
    pageSize,
    showSizeChanger: true,
    pageSizeOptions: [],
    onShowSizeChange: (size: number) => {
      setPageSize(size)
    },
    onChange: (page: number) => {
      setSearchParams(params => {
        params.set('page', page.toString())
        return params
      })
    },
    size: 'default',
  }

  return {
    currentPage,
    pageSize,
    paginationConfig,
  }
}
