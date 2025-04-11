// import { useQuery } from '@tanstack/react-query'
import { Typography } from 'antd'
import { Navigation } from './Navigation'
import * as S from './SideBar.style'
import { env } from '@/env'

export function SideBar({ isCollapsable }: { isCollapsable: boolean }) {
  // const month = getMonthValue(0)
  // const { isDemoAccount } = useDemoAccount()

  // const { data, isLoading } = useQuery({
  //   queryKey: ['dashboard-consumption', { month }],
  //   queryFn: () => getConsumption({ month }),
  //   refetchOnWindowFocus: false,
  //   staleTime: 1000 * 60 * 30, // 30 minutes
  // })

  return (
    <S.Container
      width={240}
      trigger={null}
      collapsible
      collapsed={isCollapsable}
      style={{
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.4)',
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
      }}
    >
      <S.Brand>
        <a
          href="/workspace"
          style={{ textDecoration: 'none', display: 'inline-block' }}
        >
          {/* {isCollapsable ? (
            <img src="/icon.png" alt="Bazly" style={{ width: 32 }} />
          ) : (
            <img src="/logo-white.png" alt="Bazly" style={{ width: 124 }} />
          )} */}
        </a>
      </S.Brand>

      <Navigation />

      <Typography.Text
        style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.5)',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {env.VITE_SOFTWARE_VERSION}
      </Typography.Text>
    </S.Container>
  )
}
