import { Content } from '@/components/Content'
import PaymentSection from '@/features/sales/components/PointOfSale/PointOfSale'
import { Typography } from 'antd'

export function SalesCreatePage() {
    return (
        <>
            <Content>
                <Typography.Title level={2}>Venda</Typography.Title>
                <PaymentSection />
            </Content>
        </>
    )
}
