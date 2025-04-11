import { Card } from "antd";
import styled from "styled-components";

export const QuickActionCard = styled(Card)`
  && {
    transition: all 0.3s ease;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
  }
`;

interface ActionButtonProps {
    bgcolor?: string;
}
export const ActionButton = styled.div<ActionButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 12px;
  background-color: ${props => props.bgcolor || '#default-color'};
  color: white;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const RecentActivityCard = styled(Card)`
  && {
    background-color: #f5f5f5;
    border-radius: 12px;
  }
`;

export const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;