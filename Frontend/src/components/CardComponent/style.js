import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
        height: 200px;
        width: 200px;
    },
    position: relative;
`

export const StyleNameProduct = styled.div`
    display: -webkit-box; 
    -webkit-box-orient: vertical; 
    -webkit-line-clamp: 2; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    font-weight: 500;
`

export const WrapperReportText = styled.div`
    font-size: 11px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 0 0px;
`

export const WrapperPriceText = styled.div`
    color: rgb(255, 66, 78);
    font-size: 18px;
    font-weight: 600;
`

export const WrapperDiscountText = styled.span`
    color: rgb(255, 66, 78);
    font-size: 14px;
    font-weight: 400;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    color: rgb(51, 51, 51);
    opacity: 1;
`