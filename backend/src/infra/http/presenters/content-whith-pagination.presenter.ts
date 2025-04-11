interface Pagination {
  current: number
  size: number
  totalCount: number
  totalPages: number
}

interface PaginatedResponse<T> {
  content: T[]
  page: Pagination
}

export const ContentWithPaginationPresenter = <T>(
  content: T[],
  total: number,
  page: number,
  limit: number,
): PaginatedResponse<T> => {
  if (page < 1 || limit < 1) {
    throw new Error('Page and limit must be greater than 0.')
  }

  if (total < 0) {
    throw new Error('Total count must be non-negative.')
  }

  return {
    content,
    page: {
      current: page,
      size: limit,
      totalCount: total,
      totalPages: Math.ceil(total / limit),
    },
  }
}
