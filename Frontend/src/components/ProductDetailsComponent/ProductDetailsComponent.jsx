import { Col, Image, InputNumber, Rate, Row } from 'antd'
import React, { useState } from 'react'
import imageProductSmall1 from '../../assets/images/imagesmall.webp'
import imageProductSmall2 from '../../assets/images/imagesmall2.webp'
import { WrapperAddressProduct, WrapperInputNumber, WrapperNameProduct, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQuantityProduct, WrapperStyleColImage, WrapperStyleImageBig, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import {
    PlusOutlined,
    MinusOutlined,

} from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import Pending from '../LoadingComponent/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct } from '../../redux/slides/orderSlide'
import { convertPrice } from '../../utils'


const ProductDetailsComponent = ({idProduct}) => {
    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector((state) => state.user)
    const location = useLocation()
    const dispatch = useDispatch()
    const onChange = (value) => {
        setNumProduct(Number(value))
    }
    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if(id) {
            const res = await ProductService.getDetailsProduct(id)
            return res.data
        }
    }

    const handleChangeCount = (type) => {
        if(type === 'increase') {
            setNumProduct(numProduct + 1)
        } else if (type === 'decrease' && numProduct > 1) {
            setNumProduct(numProduct - 1)
        }
    }

    const {isPending, data: productDetails} = useQuery({ queryKey: ['product-details', idProduct], queryFn: fetchGetDetailsProduct, ...{ enabled: !!idProduct } })  


    const navigate = useNavigate()

    const handleAddOrderProduct = () => {
        if(!user?.id) {
            navigate('/sign-in', {state: location?.pathname})
        } else {
            dispatch(addOrderProduct({
                orderItem: {
                    name: productDetails?.name,
                    amount: numProduct,
                    image: productDetails?.image,
                    price: productDetails?.price,
                    product: productDetails?._id
                }
            }))
        }
    }

    var input = productDetails?.description
    


    return (
    <Pending isPending={isPending}>
        <Row style={{padding: '20px', background: '#fff', borderRadius: '4px'}}>
        <Col span={10} style={{borderRight: '1px solid #e5e5e5', paddingRight: '30px'}}>
                <WrapperStyleImageBig src={productDetails?.image} alt="image product" />
                <Row style={{paddingTop: '10px', justifyContent: 'space-between', }}>
                    <WrapperStyleColImage span={4}>
                    <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview="false" />
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                    <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview="false" />
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                    <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview="false" />
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                    <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview="false" />
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                    <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview="false" />
                    </WrapperStyleColImage>
                </Row>
        </Col>
        <Col span={14} style={{paddingLeft: '30px'}}>
                <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                <div>
                    <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
                    <WrapperStyleTextSell> |63276 lượt xem</WrapperStyleTextSell>
                    <WrapperStyleTextSell> | 2264 đã bán | </WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>{convertPrice(productDetails?.price)}₫</WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Giao đến </span>
                    <span className='address'>{user?.address}</span> - 
                    <span className='change-address'> Đổi địa chỉ</span>
                </WrapperAddressProduct>
                <div style={{margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5'}}>
                    <div style={{ marginBottom: '10px'}}>Số lượng</div>
                    <WrapperQuantityProduct>
                        <button style={{border: 'none', background: 'transparent', cursor: 'pointer'}} onClick={() => handleChangeCount('decrease')}>
                            <MinusOutlined style={{color: '#000', fontSize: '20px'}}/>
                        </button>
                        
                        <WrapperInputNumber onChange={onChange} defaultValue={1} value={numProduct} size="small" />

                        <button style={{border: 'none', background: 'transparent', cursor: 'pointer'}} onClick={() => handleChangeCount('increase')} >
                            <PlusOutlined style={{color: '#000', fontSize: '20px'}}/>
                            </button>
                    </WrapperQuantityProduct>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <ButtonComponent
                        size={40}
                        styleButton={{
                            background: 'rgb(255, 57, 69)',
                            height: '48px',
                            width: '220px',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                        onClick={handleAddOrderProduct}
                        textButton={'Chọn mua'}
                        styleTextButton={{color: '#fff', fontSize: '15px', fontWeight: '700'}}
                    ></ButtonComponent>

                    <ButtonComponent
                        size={40}
                        styleButton={{
                            background: '#fff',
                            height: '48px',
                            width: '220px',
                            border: '1px solid rgb(13, 92, 182)',
                            borderRadius: '4px'
                        }}
                        textButton={'Mua trả sau'}
                        styleTextButton={{color: 'rgb(13, 92, 182)', fontSize: '15px'}}
                    ></ButtonComponent>
                </div>
        </Col>
        </Row>
        {/* background:linear-gradient(60deg, #ffab00, #ff00bb, #03dc55, #ffffff, #000000, #000000, #000000, #6fba82); */}
        <div style={{padding: '20px', background: '#fff', borderRadius: '4px', marginTop: '30px', width: '70%'}}>
            <h2 style={{fontWeight: '500'}}>MÔ TẢ SẢN PHẨM</h2>
            <WrapperNameProduct >{productDetails?.name}</WrapperNameProduct>
            <p style={{fontSize: '16px'}} >
                {(productDetails?.description)}
                <br/>
                <br/>
                <WrapperNameProduct >Thiết kế mạnh mẽ nhưng thầm lặng</WrapperNameProduct>
                {(productDetails?.description)}
                <br/>
                <Image style={{marginLeft: '100px'}} preview={false} src={productDetails?.image} alt="image product" />
                <br/>
                <WrapperNameProduct >Khả năng xử lý</WrapperNameProduct>
                {(productDetails?.description)}
                <br/>
                <br/>
                {(productDetails?.description)}
            </p>
            
        </div>
    </Pending>
    )
}

export default ProductDetailsComponent