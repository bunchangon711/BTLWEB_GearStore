import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
    height: 64px;
    width: 64px;
`

export const WrapperStyleImageBig = styled(Image)`
`

export const WrapperStyleColImage = styled(Col)`
    flex-basics: unset;
    display: flex;
`

export const WrapperStyleNameProduct = styled.h1`
    font-size: 24px;
    font-weight: 600;
    color: #000;
    text-transform: capitalize;
    display: inline-block;
    margin: 0;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    color: rgb(51, 51, 51);
    opacity: 1;
`

export const WrapperPriceProduct = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;

`

export const WrapperPriceTextProduct = styled.h1`
    font-size: 22px;
    color: #ff0000;
    font-weight: 600;
    margin-right: 15px;
    padding: 10px;
    margin-top: 10px;
`

export const WrapperAddressProduct = styled.div`
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsisl;
    };
    span.change-address {
        color: rgb(11, 116, 229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    }
`

export const WrapperQuantityProduct = styled.div`
    display: flex;
    align-items: center;
    max-width: 105px;
    border: 1px solid #ccc;
    border-radius: 4px;
`


export const WrapperInputNumber = styled(InputNumber)`
    border-top: none;
    border-bottom: none;
    border-radius: 0px;
    .ant-input-number.ant-input-number-sm {
        width: 40px;
        border-radius: 0px;
        border-top: none;
        border-bottom: none;
    };
    .ant-input-number-handler-wrap {
        display: none !important;
    }
`

export const WrapperNameProduct = styled.p`
    font-size: 18px;
    font-weight: 600;
    color: #d0021b;
    text-align: center !important;
    border-image: linear-gradient(60deg, #ffab00, #ff00bb, #03dc55, #ffffff, #000000, #000000, #000000, #6fba82) 5;
    border-width: 4px;
    border-style: solid;
    border-spacing: 15px;
`