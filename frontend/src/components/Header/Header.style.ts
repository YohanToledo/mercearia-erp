import styled from 'styled-components'
import { Layout, Typography } from 'antd'

export const Container = styled(Layout.Header)`
  padding: 0 30px;
  background-color: '#fff';
  box-shadow: 0px 2px 4px 0px #00000005;
  box-shadow: 0px 1px 6px -1px #00000005;
  box-shadow: 0px 1px 2px 0px #00000008;
`

export const Warp = styled.div`
  float: right;
`

export const Username = styled(Typography.Text)`
  font-size: 16px;
`
