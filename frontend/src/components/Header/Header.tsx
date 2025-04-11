import { Menu, Dropdown, Avatar, Space, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'

import { env } from '@/env'
import useUserFromToken from '@/hooks/useUserFromToken'

import * as S from './Header.style'
import { AiOutlineMenu } from 'react-icons/ai'
import { IoIosArrowBack } from 'react-icons/io'

interface HeaderProps {onClickCollapse: () => void, isCollapsable: boolean}

export function Header({onClickCollapse, isCollapsable}: HeaderProps) {
  const navigate = useNavigate()
  const username = useUserFromToken()

  const handleLogout = () => {
    localStorage.removeItem(env.VITE_SESSION_KEY || 't')
    navigate('/')
  }

  const UserMenu = (
    <Menu>
      {/* <Menu.Item key="profile" icon={<UserOutlined />}>
        Meu Perfil
      </Menu.Item> */}
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Sair
      </Menu.Item>
    </Menu>
  )

  return (
    <S.Container>
      <Button
            type="text"
            icon={isCollapsable ? <AiOutlineMenu /> : <IoIosArrowBack />}
            onClick={onClickCollapse}
            style={{
              fontSize: '16px',
            }}
          />
      <S.Warp>
        <Dropdown overlay={UserMenu} trigger={['click']}>
          <Space style={{ cursor: 'pointer' }}>
            <Avatar icon={<UserOutlined />} alt="User" />
            <S.Username>{username}</S.Username>
          </Space>
        </Dropdown>
      </S.Warp>
    </S.Container>
  )
}
