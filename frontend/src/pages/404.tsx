import { Link } from 'react-router-dom'
import { Result, Button, Typography } from 'antd'

const { Title, Text } = Typography

export function NotFound() {
  return (
    <Result
      status="404"
      title={<Title level={2}>Estamos Trabalhando Nisso!</Title>} // Mensagem amigável
      subTitle={
        <Text style={{ fontSize: '18px' }}>
          Esta funcionalidade ainda está em construção, mas em breve estará disponível para você.
        </Text>
      }
      extra={
        <Link to="/workspace/home">
          <Button type="primary" size="large">Voltar para o início</Button>
        </Link>
      }
    />
  )
}