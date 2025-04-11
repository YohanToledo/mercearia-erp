import styled from 'styled-components'
import { Form as AntdForm, Button as AntdButton } from 'antd'
import { theme } from '@/styles/themeApp'
import { color } from '@/styles/_colors'

export const Container = styled.div`
  background-color: ${color.bodyGray};
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  display: grid;
  place-items: center;
  overflow-y: auto;
`

export const Warp = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const Content = styled.div`
  background-color: ${color.white};
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  max-height: 94.5vh;
  min-width: 40vw;
  overflow-y: auto;
  overflow-x: hidden;
`

export const header = styled.div`
  width: 50%;
  align-items: flex-start;
`

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  color: ${theme.color.primary};
`

export const Logo = styled.div`
  margin-bottom: 1rem;

  > img {
    width: 10vw;
  }
`

export const FormContainer = styled.div`
  width: 90%;
  height: 100%;
  margin-bottom: 2rem;
  display: flex;
  align-items: stretch;
  justify-content: center;

  > form {
    width: calc(100% - 4rem);
  }
`

export const FormItem = styled(AntdForm.Item)`
  margin-bottom: 1rem;
`

export const Button = styled(AntdButton)`
  width: 100%;
  margin-top: 0.625rem;
`
