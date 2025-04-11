import React from 'react'
import { Row, Col, Input, Button } from 'antd'
import { FiPlus, FiSearch } from 'react-icons/fi'
import * as S from './SearchHeader.style'

interface SearchHeaderProps {
  buttonText: string
  onButtonClick: () => void
  isCreatable?: boolean
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function SearchHeader({
  buttonText,
  onButtonClick,
  onInputChange,
  isCreatable = true,
}: SearchHeaderProps) {
  return (
    <S.Container>
      <Row justify="end" align="middle" gutter={10}>
        <Col span={4}>
          <Input
            name="search"
            placeholder="Pesquisar"
            prefix={<FiSearch />}
            size="large"
            onChange={onInputChange}
          />
        </Col>
        {isCreatable && (
          <Col>
          <Button
            type="primary"
            icon={<FiPlus />}
            size="large"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </Col>
        )}
      </Row>
    </S.Container>
  )
}
