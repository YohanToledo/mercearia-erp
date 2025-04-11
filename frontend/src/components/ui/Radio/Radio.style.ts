import styled from 'styled-components'
import { Radio as AntRadio } from 'antd'
import { theme } from '@/styles/themeApp'

export const RadioGroup = styled(AntRadio.Group)`
  &&& {
    .ant-radio-wrapper {
      margin-bottom: 5px;
    }
  }
`

export const Radio = styled(AntRadio)`
  &&& {
    .ant-radio {
      display: flex;
      align-items: center;

      .ant-radio-inner {
        border-color: ${theme.color.secondary};
        background-color: ${theme.color.secondary};
      }

      .ant-radio-inner::after {
        background-color: ${theme.color.white};
      }
    }
  }
`
