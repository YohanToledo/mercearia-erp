import { Button, Card } from "antd";
import styled from "styled-components";

export const POSContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #f0f2f5;
`;

export const StyledCard = styled(Card)`
  flex: 2;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background-color: white;
`;

export const RightPanel = styled.div`
  flex: 1.5; // Increased from 1 to 1.5
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const SalesSummarySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const MonetaryDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 12px;
  padding: 15px 20px;
  margin-bottom: 10px;
`;

export const MonetaryLabel = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

export const MonetaryValue = styled.span`
  font-size: 28px;
  font-weight: bold;
  color: #1890ff;
`;

export const DiscountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const PaymentMethodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 20px;
`;

export const PaymentMethodButton = styled(Button) <{ selected?: boolean }>`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  font-size: 16px;
  
  .anticon {
    font-size: 20px;
    margin-bottom: 10px;
  }

  ${props => props.selected && `
    border-color: #1890ff;
    color: #1890ff;
    font-weight: bold;
    background-color: #e6f7ff;
  `}
`;
export const FinalizeSaleButton = styled(Button)`
  height: 70px;
  font-size: 20px;
  border-radius: 12px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
