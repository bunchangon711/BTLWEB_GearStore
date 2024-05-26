import React from 'react'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import { useNavigate, useParams } from 'react-router-dom'
import StickyComponent from '../../components/StickyComponent/StickyComponent'

const ProductDetailsPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    return (
        <div style={{height: '280vh', width: '100%', background: '#efefef'}} >
            <StickyComponent />
            <div style={{padding: '5px 220px', height: '80%', margin: '0 auto', width: '65%'}}>
                <h3><span style={{cursor: 'pointer'}} onClick={() => {navigate('/')}}>Trang chủ</span> {'>'} Chi tiết sản phẩm</h3>
                <ProductDetailsComponent idProduct={id} />
            </div>
        </div>
    )
}

export default ProductDetailsPage