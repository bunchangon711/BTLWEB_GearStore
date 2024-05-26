import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
import {
    StarFilled,

} from '@ant-design/icons';
import logo from '../../assets/images/official.png'
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';

const CardComponent = (props) => {
    const {countInStock, description, image, name, price, rating, type, discount, sold, id} = props
    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }
    return (
        <WrapperCardStyle
            hoverable
            header={{width: '200px', height: '200px'}}
            style={{ width: 200 }}
            body = {{ padding: '10px'}}
            cover={<img alt="example" src={image} />}
            onClick={() => handleDetailsProduct(id)}
        >
            <img 
                src={logo} 
                preview="false"
                style={{
                    width: '80px', height: '20px', position: 'absolute', top: '0', left: '0',
                    borderTopLeftRadius: '3px'
                }} 
            />
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText style={{fontSize: '16px', marginRight: '5px'}}>
                <span>
                    <span>{rating}</span> <StarFilled style={{color: 'yellow'}} />
                </span>
                <WrapperStyleTextSell>  |  Đã bán {sold || 50}+</WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px'}}>{convertPrice(price)}₫</span>
                <WrapperDiscountText>
                    -{discount || 5} %
                </WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}

export default CardComponent