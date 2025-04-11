import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Form, Input, Alert } from 'antd'

import { signIn } from '@/features/auth/api/sign-in'
import { signInMessage } from '@/features/auth/constants/sign-in.messages'

import * as S from './SignIn.style'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

export function SignInPage() {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [alertType, setAlertType] = useState<'success' | 'error' | undefined>(
    undefined,
  )

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  const handleAuthenticate = async (values: { username: string, password: string }) => {
    try {
      setLoading(true)

      await authenticate(values)

      form.resetFields()

      setMessage(signInMessage.authorized)
      setAlertType('success')
      navigate('/workspace/home')
    } catch (error) {

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setMessage(signInMessage.unauthorized)
        }

        if (error.response?.status === 403) {
          setMessage(signInMessage.disabled)
        }
      }

      setAlertType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <S.Container>
      <S.Warp>
        <S.Content>
          <S.header>
            <S.Logo>
              <img src="" alt="Bazly" />
            </S.Logo>

            <S.Title>Bazly</S.Title>

            {message && (
              <Alert
                message={message}
                type={alertType}
                showIcon
                style={{ marginBottom: '30px' }}
              />
            )}
          </S.header>

          <S.FormContainer>
            <Form
              form={form}
              name="signInForm"
              layout="vertical"
              requiredMark={false}
              onFinish={handleAuthenticate}
            >
              <Form.Item
                label="Usuário"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Usuário',
                  },
                  {
                    type: 'string',
                    message: 'Usuraio incorreto inválido!',
                  },
                ]}
              >
                <Input placeholder="" size="large" onChange={() => setMessage(null)}/>
              </Form.Item>

              <Form.Item
                label="Senha"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Insira sua senha!',
                  },
                  {
                    type: 'string',
                    message: 'Senha deve ser um texto!',
                  },
                ]}
              >
                <Input type="password" placeholder="" size="large" onChange={() => setMessage(null)}/>
              </Form.Item>

              <Form.Item>
                <S.Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={loading}
                >
                  Acessar
                </S.Button>
              </Form.Item>
            </Form>
          </S.FormContainer>
        </S.Content>
      </S.Warp>
    </S.Container>
  )
}
