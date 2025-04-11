import styled from 'styled-components'
import { Menu } from 'antd'
import { color } from '@/styles/_colors'

export const Nav = styled(Menu)`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  padding: 10px;
  border: none;
  background-color: ${color.secondary};
  color: #ffffff;
  font-weight: 500;

  .ant-menu-root {
    border-inline-end: none;
  }

  .ant-menu-item,
  .ant-menu-submenu-title {
    color: #ffffff;
    background-color: ${color.secondary};
    font-size: 1rem;
  }

  .ant-menu-item:hover,
  .ant-menu-submenu-title:hover {
    background-color: ${color.secondaryHover} !important;
    color: #ffffff;
  }

  .ant-menu-item-selected,
  .ant-menu-submenu-selected > .ant-menu-submenu-title {
    background-color: ${color.white} !important;
    color: ${color.secondary};
  }
`

export const MenuItem = styled(Menu.Item)`
  font-weight: 500;
  color: #ffffff;

  &:hover {
    background-color: ${color.secondaryHover} !important;
  }

  .ant-menu-item-icon {
    width: 18px;
    font-size: 18px;
  }
`
