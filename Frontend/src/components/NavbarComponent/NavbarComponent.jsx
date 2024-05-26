import React from 'react'
import { WrapperContent, WrapperLabelText, WrapperTextPrice, WrapperTextValue } from './style'
import { Checkbox, Col, Rate, Row } from 'antd'
import { useNavigate } from 'react-router-dom'

const NavbarComponent = () => {
    const onChange = () => { }
    const navigate = useNavigate()
    const renderContent = (type, options) => {
        switch(type) {
            case 'text':
                return options.map((option) =>{
                    return (
                        <WrapperTextValue style={{marginTop: '8px'}} onClick={() => {navigate(`/product/${option.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, {state: option})}} >{option}</WrapperTextValue>
                    )
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option) => {
                            return (
                                <Checkbox style={{marginLeft: '0'}} value={option.value}>{option.label}</Checkbox>
                            )
                        })}
                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option) => {
                    return (
                        <div style={{display: 'flex', gap: '8px'}}>
                            <Rate style={{fontSize: '14px'}} disabled defaultValue={option} />
                            <span> {`từ ${option} sao`}</span>
                        </div>
                    )
                })
            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice>{option}</WrapperTextPrice>
                    )
                })
            default:
                return {}
        }
    }

    return (
        <div>
            <WrapperLabelText>Category</WrapperLabelText>
            <WrapperContent>
                {renderContent('text', ['Laptop', 'PC', 'Case', 'Màn hình', 'Linh kiện', 'Bàn ghế', 'Phần mềm'])}
            </WrapperContent>
        </div>
    )
}

export default NavbarComponent