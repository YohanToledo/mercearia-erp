import React from 'react'
import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { FiClipboard, FiDollarSign, FiList, FiPieChart, FiPlusCircle, FiShoppingBag, FiShoppingCart, FiTrendingUp } from 'react-icons/fi'
import * as S from './Navigation.style'
import useUserSubPermissions from '@/hooks/useUserSubPermissions'
import { AiOutlineBarChart, AiOutlineHome } from 'react-icons/ai'
import { MdAttachMoney, MdOutlinePointOfSale } from 'react-icons/md'

interface NavItem {
  key: string
  icon: React.ReactNode
  label: string
  path?: string
  url?: string // Adicionando uma propriedade para URLs externas
  isAdmin?: boolean
  children?: NavItem[]
}

const navs: NavItem[] = [
  {
    key: 'home',
    icon: <AiOutlineHome />,
    label: 'Início',
    path: '/workspace/home',
  },
  {
    key: 'products',
    icon: <FiShoppingBag />,
    label: 'Produtos',
    children: [
      {
        key: 'new-product',
        icon: <FiPlusCircle />,
        label: 'Novo Produto',
        path: '/workspace/products/create',
      },
      {
        key: 'list-product',
        icon: <FiList />,
        label: 'Lista de produtos',
        path: '/workspace/products',
      },
      {
        key: 'product-reports',
        icon: <AiOutlineBarChart />,
        label: 'Relatórios',
        path: '/workspace/products/reports',
      },
    ],
  },
  {
    key: 'sales',
    icon: <MdOutlinePointOfSale />,
    label: 'Caixa',
    children: [
      {
        key: 'new-sale',
        icon: <FiShoppingCart />,
        label: 'Nova Venda',
        path: '/workspace/sales/create',
      },
      {
        key: 'sale-summary',
        icon: <MdAttachMoney />,
        label: 'Fechamento de Caixa',
        path: '/workspace/sales/summary',
      },
      {
        key: 'sale-reports',
        icon: <FiTrendingUp />,
        label: 'Relatórios',
        path: '/workspace/sales/reports',
      },
    ],
  },
  {
    key: 'expenses',
    icon: <FiDollarSign />,
    label: 'Despesas',
    children: [
      {
        key: 'new-expense',
        icon: <FiPlusCircle />,
        label: 'Nova Despesa',
        path: '/workspace/expenses/create',
      },
      {
        key: 'list-expenses',
        icon: <FiClipboard />,
        label: 'Lista de despesas',
        path: '/workspace/expenses/list',
      },
      {
        key: 'expense-reports',
        icon: <FiPieChart />,
        label: 'Relatórios de Despesas',
        path: '/workspace/expenses/reports',
      },
    ],
  },
  {
    key: 'analysis',
    icon: <AiOutlineBarChart />,
    label: 'Gráficos',
    path: '/workspace/analysis',
  },
  {
    key: 'analysis2',
    icon: <AiOutlineBarChart />,
    label: 'Gráficos 2',
    path: '/workspace/analysis2',
  },
]

export function Navigation() {
  const navigate = useNavigate()
  const { isAdmin } = useUserSubPermissions()

  const handleClick = (e: { key: string }) => {
    const item = navs
      .flatMap(nav => [nav, ...(nav.children || [])])
      .find(nav => nav.key === e.key)

    if (item) {
      if (item.path) {
        navigate(item.path)
      } else if (item.url) {
        window.open(item.url, '_blank', 'noopener,noreferrer')
      }
    }
  }

  return (
    <S.Nav mode="vertical" onClick={handleClick}>
      {navs
        .filter(nav => !nav.isAdmin || (nav.isAdmin && isAdmin))
        .map(nav =>
          nav.children ? (
            <Menu.SubMenu
              key={nav.key}
              icon={nav.icon}
              title={nav.label}
            >
              {nav.children
                .filter(child => !child.isAdmin || (child.isAdmin && isAdmin))
                .map(child => (
                  <S.MenuItem key={child.key} icon={child.icon}>
                    {child.label}
                  </S.MenuItem>
                ))}
            </Menu.SubMenu>
          ) : (
            <S.MenuItem key={nav.key} icon={nav.icon}>
              {nav.label}
            </S.MenuItem>
          ),
        )}

    </S.Nav>
  )
}
