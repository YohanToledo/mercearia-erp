import React, { useEffect, useState } from "react";
import {
  Table,
  InputNumber,
  Button,
  Radio,
  Space,
  Input,
  Tag,
  Tooltip,
  Alert,
  message
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
  WalletOutlined,
  DollarOutlined,
  PercentageOutlined,
  CheckCircleOutlined,
  BankOutlined
} from "@ant-design/icons";
import * as S from './PoitOfSaleStyle'
import Mousetrap from "mousetrap";

const { Search } = Input;

const PaymentSection: React.FC = () => {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Camiseta", preco: 50, quantidade: 1, desconto: 0, tipoDesconto: "valor" },
    { id: 2, nome: "Calça Jeans", preco: 120, quantidade: 1, desconto: 0, tipoDesconto: "valor" },
    { id: 3, nome: "Tênis", preco: 200, quantidade: 1, desconto: 0, tipoDesconto: "valor" },
  ]);

  const [desconto, setDesconto] = useState(0);
  const [tipoDesconto, setTipoDesconto] = useState<"valor" | "percent">("valor");
  const [formaPagamento, setFormaPagamento] = useState("dinheiro");
  const [busca, setBusca] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState<any | null>(null);

  const produtosDisponiveis = [
    { id: 4, nome: "Boné", preco: 40, desconto: 0, tipoDesconto: "valor" },
    { id: 5, nome: "Jaqueta", preco: 300, desconto: 0, tipoDesconto: "valor" },
    { id: 6, nome: "Mochila", preco: 150, desconto: 0, tipoDesconto: "valor" },
  ];

  const atualizarQuantidade = (id: number, quantidade: number) => {
    setProdutos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantidade } : p))
    );
  };

  const atualizarDesconto = (id: number, valor: number, tipo: string) => {
    setProdutos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, desconto: valor, tipoDesconto: tipo } : p))
    );
  };

  const removerProduto = (id: number) => {
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  };

  const adicionarProduto = () => {
    if (produtoSelecionado) {
      // Verificar se o produto já existe na lista
      const produtoExistente = produtos.find(p => p.id === produtoSelecionado.id);

      if (produtoExistente) {
        // Se existir, incrementa a quantidade
        setProdutos(prev => prev.map(p =>
          p.id === produtoSelecionado.id
            ? { ...p, quantidade: p.quantidade + 1 }
            : p
        ));
      } else {
        // Se não existir, adiciona novo produto
        setProdutos([...produtos, { ...produtoSelecionado, quantidade: 1 }]);
      }

      setProdutoSelecionado(null);
      setBusca("");
    }
  };

  const subtotal = produtos.reduce((sum, p) => {
    const desconto = p.tipoDesconto === "percent" ? (p.preco * p.desconto) / 100 : p.desconto;
    return sum + (p.preco - desconto) * p.quantidade;
  }, 0);

  const descontoCalculado = tipoDesconto === "percent" ? (subtotal * desconto) / 100 : desconto;
  const total = Math.max(0, subtotal - descontoCalculado);

  const pagamentoMetodos = [
    {
      valor: "dinheiro",
      label: "Dinheiro",
      icon: <WalletOutlined />,
      shortcut: 'd'
    },
    {
      valor: "cartao-credito",
      label: "Cartão - Crédito",
      icon: <CreditCardOutlined />,
      shortcut: 'c'
    },
    {
      valor: "cartao-debito",
      label: "Cartão - Débito",
      icon: <BankOutlined />,
      shortcut: 'b'
    },
    {
      valor: "pix",
      label: "PIX",
      icon: <ShoppingCartOutlined />,
      shortcut: 'p'
    }
  ];

  // Add keyboard shortcut for payment methods
  useEffect(() => {
    // Bind keyboard shortcuts for payment methods
    pagamentoMetodos.forEach(metodo => {
      Mousetrap.bind(metodo.shortcut, () => {
        setFormaPagamento(metodo.valor);
        message.info(`Forma de pagamento: ${metodo.label}`);
        return false;
      });
    });

    // Bind shortcut for finalizing sale
    Mousetrap.bind('enter', () => {
      if (produtos.length > 0) {
        // Logic for finalizing sale
        message.success('Venda finalizada!');
      }
      return false;
    });

    // Bind shortcut for adding product
    Mousetrap.bind('ctrl+a', () => {
      if (produtoSelecionado) {
        adicionarProduto();
      }
      return false;
    });

    // Bind shortcut for applying discount
    Mousetrap.bind('ctrl+d', () => {
      setTipoDesconto(prev => prev === "valor" ? "percent" : "valor");
      message.info(`Tipo de desconto alterado para: ${tipoDesconto === "valor" ? "Porcentagem" : "Valor Fixo"}`);
      return false;
    });

    // Cleanup function
    return () => {
      pagamentoMetodos.forEach(metodo => {
        Mousetrap.unbind(metodo.shortcut);
      });
      Mousetrap.unbind('enter');
      Mousetrap.unbind('ctrl+a');
      Mousetrap.unbind('ctrl+d');
    };
  }, [formaPagamento, produtos, produtoSelecionado, tipoDesconto]);

  return (
    <S.POSContainer>
      <S.StyledCard title="Lista de Produtos">
        <Space style={{ marginBottom: "15px", width: "100%" }}>
          <Search
            placeholder="Buscar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onSearch={(value) => {
              const encontrado = produtosDisponiveis.find((p) =>
                p.nome.toLowerCase().includes(value.toLowerCase())
              );
              if (encontrado) setProdutoSelecionado(encontrado);
            }}
            style={{ width: "60%" }}
            enterButton={<SearchOutlined />}
          />

          <Button
            type="primary"
            disabled={!produtoSelecionado}
            onClick={adicionarProduto}
          >
            Adicionar Produto
          </Button>
        </Space>

        <Table
          dataSource={produtos}
          rowKey="id"
          columns={[
            {
              title: "Produto",
              dataIndex: "nome",
              render: (nome) => <strong>{nome}</strong>
            },
            {
              title: "Quantidade",
              dataIndex: "quantidade",
              render: (_, record) => (
                <InputNumber
                  min={1}
                  max={100}
                  value={record.quantidade}
                  onChange={(value) => atualizarQuantidade(record.id, value || 1)}
                  style={{ width: "80px" }}
                />
              ),
            },
            {
              title: "Preço",
              dataIndex: "preco",
              render: (preco, record) => (
                <Tag color="blue">
                  R$ {(preco * record.quantidade).toFixed(2)}
                </Tag>
              ),
            },
            {
              title: "Desconto",
              dataIndex: "desconto",
              render: (_, record) => (
                <Space direction="vertical">
                  <Radio.Group
                    value={record.tipoDesconto}
                    onChange={(e) => atualizarDesconto(record.id, record.desconto, e.target.value)}
                  >
                    <Radio value="valor">R$</Radio>
                    <Radio value="percent">%</Radio>
                  </Radio.Group>

                  <InputNumber
                    min={0}
                    max={record.tipoDesconto === "percent" ? 100 : record.preco}
                    value={record.desconto}
                    onChange={(value) => atualizarDesconto(record.id, value || 0, record.tipoDesconto)}
                    style={{ width: "70px" }}
                  />
                </Space>
              ),
            },
            {
              title: "Ações",
              dataIndex: "acoes",
              render: (_, record) => (
                <Tooltip title="Remover Produto">
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => removerProduto(record.id)}
                  />
                </Tooltip>
              ),
            },
          ]}
          pagination={false}
        />
      </S.StyledCard>

      <S.RightPanel>
        <S.SalesSummarySection>
          <S.MonetaryDisplay>
            <S.MonetaryLabel>Subtotal:</S.MonetaryLabel>
            <S.MonetaryValue>R$ {subtotal.toFixed(2)}</S.MonetaryValue>
          </S.MonetaryDisplay>

          <S.DiscountContainer>
            <h2 style={{ margin: 0, fontSize: '22px' }}>Desconto</h2>
            <Radio.Group
              size="large"
              value={tipoDesconto}
              onChange={(e) => setTipoDesconto(e.target.value)}
            >
              <Radio value="valor">
                <DollarOutlined /> Valor Fixo
              </Radio>
              <Radio value="percent">
                <PercentageOutlined /> Porcentagem
              </Radio>
            </Radio.Group>

            <InputNumber
              size="large"
              prefix={tipoDesconto === "valor" ? "R$" : "%"}
              min={0}
              max={tipoDesconto === "percent" ? 100 : subtotal}
              value={desconto}
              onChange={(value) => setDesconto(value || 0)}
              style={{ width: "100%" }}
            />
          </S.DiscountContainer>

          <S.MonetaryDisplay style={{
            backgroundColor: "#e6fffb",
            border: "2px solid #52c41a"
          }}>
            <S.MonetaryLabel style={{ color: "#52c41a" }}>Total:</S.MonetaryLabel>
            <S.MonetaryValue style={{ color: "#52c41a", fontSize: '36px' }}>
              R$ {total.toFixed(2)}
            </S.MonetaryValue>
          </S.MonetaryDisplay>

          {produtos.length === 0 && (
            <Alert
              message="Adicione produtos para continuar"
              type="info"
              showIcon
              style={{ marginBottom: '15px' }}
            />
          )}

<div>
            <h2 style={{ marginBottom: '20px', fontSize: '22px' }}>
              Forma de Pagamento
            </h2>
            <S.PaymentMethodGrid>
              {pagamentoMetodos.map((metodo) => (
                <S.PaymentMethodButton
                  key={metodo.valor}
                  icon={metodo.icon}
                  selected={formaPagamento === metodo.valor}
                  onClick={() => setFormaPagamento(metodo.valor)}
                >
                  {metodo.label}
                  <span style={{ 
                    position: 'absolute', 
                    bottom: '5px', 
                    right: '5px', 
                    fontSize: '12px', 
                    color: '#999' 
                  }}>
                    (tecla {metodo.shortcut})
                  </span>
                </S.PaymentMethodButton>
              ))}
            </S.PaymentMethodGrid>
          </div>

          <S.FinalizeSaleButton 
            type="primary" 
            block 
            disabled={produtos.length === 0}
            icon={<CheckCircleOutlined />}
          >
            Finalizar Venda (Enter)
          </S.FinalizeSaleButton>
        </S.SalesSummarySection>
      </S.RightPanel>
    </S.POSContainer>
  );
};

export default PaymentSection;