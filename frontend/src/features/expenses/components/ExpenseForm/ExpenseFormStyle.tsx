import { Form } from "antd"
import styled from "styled-components"

export const StyledForm = styled(Form)`
  .ant-form-item-label {
    display: flex;
    align-items: center;
  }
  
  .ant-form-item-label label {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ant-input, 
  .ant-input-number,
  .ant-select-selector,
  .ant-picker {
    background-color: #f5f5f5 !important;
    border: 1px solid #e0e0e0 !important;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05) !important;
    transition: all 0.3s ease;
  }

  .ant-input:focus, 
  .ant-input-number:focus,
  .ant-select-focused .ant-select-selector,
  .ant-picker:focus {
    border-color: #1890ff !important;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
    background-color: white !important;
  }

  .ant-input:hover, 
  .ant-input-number:hover,
  .ant-select:hover .ant-select-selector,
  .ant-picker:hover {
    border-color: #1890ff !important;
  }

  .ant-form-item-label {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  
  .ant-form-item-label label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #333;
    font-weight: 500;
  }
`

export const FormCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`
