import { Skeleton } from 'antd'

export const ProgressSkeleton = () => {
  return (
    <div
      style={{
        padding: '15px',
        bottom: 0,
        margin: '35vh 20px 0 20px',
        borderRadius: '8px',
        border: '1px solid #434343',
        backgroundColor: '#1F1F1F',
        color: '#fff',
      }}
    >
      <Skeleton
        active
        paragraph={false}
        title={{ width: '100%', style: { marginBottom: '10px' } }}
      />

      <Skeleton
        active
        paragraph={false}
        title={{
          width: '100%',
          style: {
            height: '10px',
            marginBottom: '10px',
            borderRadius: '10px',
            backgroundColor: '#bbbbbb',
          },
        }}
      />

      <Skeleton
        active
        paragraph={false}
        title={{
          width: '50%',
          style: {
            height: '10px',
            borderRadius: '10px',
            background:
              'linear-gradient(to right, #ac8ada, #e073a4, #e26a71, #f5bf69)',
          },
        }}
      />
    </div>
  )
}
