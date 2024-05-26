import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 18px;
    margin: 15px 0;
`

export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 650px;
    margin: 0 auto;
    padding: 40px;
    border-radius: 10px;
    background-color: #fff;
`

export const WrapperLabel = styled.label`
    color: #000;
    font-size: 14px;
    line-height: 40px;
    font-weight: 600;
    width: 60px;
    text-align: left;
`

export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 25px;
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list.ant-upload-list-text {   
        display: none;
    }
`
// Change from & .ant-upload-list-item-info to .ant-upload-list.ant-upload-list-text