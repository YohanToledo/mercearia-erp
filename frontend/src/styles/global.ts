import { createGlobalStyle, css } from 'styled-components'
import { theme } from './themeApp'
import { color } from './_colors'

export const GlobalStyles = createGlobalStyle`
  ${() => css`
    .ant-input:hover,
    .ant-input:focus,
    .ant-input-outlined:hover,
    .ant-input-outlined:focus,
    .ant-input-outlined:focus-within {
      border-color: ${theme.color.gray[100]} !important;
      box-shadow: none !important;
    }

    .ant-input-search .ant-input:hover,
    .ant-input-search .ant-input:focus {
      border-color: ${theme.color.gray[100]};
      box-shadow: none;
    }

    .ant-table-thead > tr > th::before {
      display: none;
    }

    .ant-menu-dark.ant-menu-submenu-popup > .ant-menu {
      background-color: ${color.secondary};
    }

    .ant-menu-dark > .ant-menu .ant-menu-item-selected {
      background-color: #333;
    }
  `};
`
