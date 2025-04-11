import React from 'react'
import { Layout } from 'antd'

import * as S from './Content.style'

interface ContentProps {
  children: React.ReactNode
}

export function Content({ children }: ContentProps) {
  return (
    <S.Container>
      <Layout.Content>{children}</Layout.Content>
    </S.Container>
  )
}
