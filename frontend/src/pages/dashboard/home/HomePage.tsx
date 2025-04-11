import { Card, Typography, Row, Col, Statistic, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaSellsy, 
  FaBoxOpen, 
  FaMoneyBillWave, 
  FaUsers, 
  FaShoppingCart, 
  FaPlus 
} from 'react-icons/fa';
import { Content } from '@/components/Content';
import * as S from './HomePageStyle'
import { useEffect } from 'react';
import Mousetrap from 'mousetrap';

const { Title, Text } = Typography;

export function HomePage() {
  const navigate = useNavigate();


  const quickActions = [
    {
      to: "/workspace/sales/create",
      icon: <FaSellsy size={48} />,
      title: "Registrar Nova Venda",
      bgColor: "#4CAF50",
      shortcut: 'v'
    },
    {
      to: "/workspace/products/create",
      icon: <FaBoxOpen size={48} />,
      title: "Cadastrar Novo Produto",
      bgColor: "#2196F3",
      shortcut: 'p'
    },
    {
      to: "/workspace/expenses/create",
      icon: <FaPlus size={48} />,
      title: "Cadastrar Nova Despesa",
      bgColor: "#FF9800",
      shortcut: 'd'
    }
  ];

  const overviewStats = [
    {
      icon: <FaMoneyBillWave color="#4CAF50" size={32} />,
      title: "Total de Vendas Hoje",
      value: "R$ 1.200,00"
    },
    {
      icon: <FaBoxOpen color="#2196F3" size={32} />,
      title: "Produtos em Estoque",
      value: "120 itens"
    },
    {
      icon: <FaUsers color="#9C27B0" size={32} />,
      title: "Clientes Cadastrados",
      value: "75 clientes"
    },
    {
      icon: <FaShoppingCart color="#FF9800" size={32} />,
      title: "Pedidos Pendentes",
      value: "3 pendentes"
    }
  ];

  // Add keyboard shortcuts
  useEffect(() => {
    // Shortcuts for quick actions
    quickActions.forEach(action => {
      Mousetrap.bind(action.shortcut, () => {
        navigate(action.to);
        message.info(`Navegando para: ${action.title}`);
        return false;
      });
    });

    // Additional useful shortcuts
    Mousetrap.bind('ctrl+n', () => {
      navigate('/nova-venda');
      message.info('Abrindo nova venda');
      return false;
    });

    Mousetrap.bind('ctrl+p', () => {
      navigate('/novo-produto');
      message.info('Abrindo cadastro de produto');
      return false;
    });

    Mousetrap.bind('ctrl+d', () => {
      navigate('/nova-despesa');
      message.info('Abrindo cadastro de despesa');
      return false;
    });

    // Cleanup function
    return () => {
      quickActions.forEach(action => {
        Mousetrap.unbind(action.shortcut);
      });
      Mousetrap.unbind('ctrl+n');
      Mousetrap.unbind('ctrl+p');
      Mousetrap.unbind('ctrl+d');
    };
  }, [navigate]);

  return (
    <Content>
      <Title level={2}>Atalhos Rápidos</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {quickActions.map((action, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Link to={action.to}>
              <S.QuickActionCard variant="borderless">
                <S.ActionButton bgcolor={action.bgColor}>
                  {action.icon}
                  <span style={{ marginLeft: 12 }}>{action.title}</span>
                  <span style={{ 
                    position: 'absolute', 
                    bottom: '30px', 
                    right: '30px', 
                    fontSize: '12px', 
                    color: 'rgba(255,255,255,0.9)' 
                  }}>
                    (tecla {action.shortcut.toUpperCase()})
                  </span>
                </S.ActionButton>
              </S.QuickActionCard>
            </Link>
          </Col>
        ))}
      </Row>

      <Title level={3}>📌 Últimas Movimentações</Title>
      <S.RecentActivityCard variant="borderless">
        <S.ActivityItem>
          <FaMoneyBillWave size={24} color="#4CAF50" style={{ marginRight: 12 }} />
          <Text>Venda de R$ 250,00 para João (14:32)</Text>
        </S.ActivityItem>
        <S.ActivityItem>
          <FaMoneyBillWave size={24} color="#4CAF50" style={{ marginRight: 12 }} />
          <Text>Venda de R$ 50,00 para Ana (10:15)</Text>
        </S.ActivityItem>
        <S.ActivityItem>
          <FaBoxOpen size={24} color="#2196F3" style={{ marginRight: 12 }} />
          <Text>Blusa Jeans adicionada (5 unidades)</Text>
        </S.ActivityItem>
      </S.RecentActivityCard>

      <Title level={3} style={{ marginTop: 24 }}>Visão Geral</Title>
      <Row gutter={[16, 16]}>
        {overviewStats.map((stat, index) => (
          <Col key={index} xs={24} sm={12} md={6}>
            <Card variant="borderless">
              <Statistic
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {stat.icon}
                    <span style={{ marginLeft: 12 }}>{stat.title}</span>
                  </div>
                }
                value={stat.value}
                valueStyle={{ fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Content>
  );
}

export default HomePage;