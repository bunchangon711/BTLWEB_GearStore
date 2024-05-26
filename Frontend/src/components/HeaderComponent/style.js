import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 18px 120px;
    background-color: rgb(208, 2, 27);
    align-items: center;
    gap: 25px;
    flex-wrap: nowrap;
`

export const WrapperTextHeader = styled.span`
    margin-left: 100px;
    font-size: 25px;
    color: #fff;
    font-weight: bold;
    text-align: left;
    &:hover {
        color: #5DEBD7;
    }
`

export const WraperHeaderPhone = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    font-size: 15px;
    white-space: nowrap;
`

export const WraperHeaderMap = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    font-size: 15px;
    white-space: nowrap;
`

export const WraperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    font-size: 15px;
    white-space: nowrap;
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        border-radius: 5px;
        color: rgb(208, 2, 27);
    }
`

export const WrapperContentPopupLocationBold = styled.p`
    font-weight: 500;
    font-size: 15px
    padding-left: 14px;
    border-top: 0;
    background: #fff;
`

export const WrapperContentLocation = styled.div`
    width: 350px;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
    text-align: center;
`

export const WrapperContentPopupLocation = styled.p`
    text-align: center;
    border: 3px solid red;
`

export const WraperHeaderCart = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    font-size: 15px;
    cursor: pointer;
`