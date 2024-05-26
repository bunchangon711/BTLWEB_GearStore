import { Button} from 'antd'
import React from 'react'
import {
    SearchOutlined,

} from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
    const 
    {
        size, placeholder, textButton, 
        backgroundColorInput = '#fff'
    } = props

    return (
        <div style={{display: 'flex', backgroundColor: backgroundColorInput}}>
            <InputComponent
                size={size} 
                placeholder={placeholder} 
                variant={'borderless'}
                style={{backgroundColor: backgroundColorInput, borderRadius: '0px'}}
                {...props}
            />
            <ButtonComponent 
                size={size} 
                styleButton={{borderRadius: '0px'}}
                icon={<SearchOutlined />} 
                textButton={textButton}
            />
        </div>
    )
}

export default ButtonInputSearch