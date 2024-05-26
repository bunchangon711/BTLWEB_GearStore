import React, { Fragment, useEffect, useState } from 'react'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { WrapperNavbar, WrapperProducts } from './style'
import { useLocation, useNavigate } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import Pending from '../../components/LoadingComponent/Loading'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'
import StickyComponent from '../../components/StickyComponent/StickyComponent'

const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 0)
    const {state} = useLocation()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [pending, setPending] = useState(false)
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 12,
        total: 1,
    })
    const fetchProductType = async (type, page, limit) => {
        setPending(true)
        const res = await ProductService.getProductType(type, page, limit)
        if(res?.status == 'OK') {
            setPending(false)
            setProducts(res?.data)
            setPanigate({...panigate, total: res?.totalPage})
        } else {
            setPending(false)
        }
    }

    useEffect(() => {
        if(state) {
            fetchProductType(state, panigate.page, panigate.limit)
        }
    }, [state, panigate.page, panigate.limit])

    const onChange = (current, pageSize) => {
        setPanigate({...panigate, page: current -1, limit: pageSize})
     }


    return (
        <Pending isPending={pending}>
            <div style={{width: '100%', background: '#efefef', height: 'calc(100vh - 64px)'}}>
                <StickyComponent />
                <div style={{padding: '5px 320px', height: '90%', margin: '0 auto'}}>
                <h3><span style={{cursor: 'pointer'}} onClick={() => {navigate('/')}}>Trang chủ</span> {'>'} Loại sản phẩm</h3>
                    <Row style={{ flexWrap: 'nowrap',  height: 'calc(100% - 20px)'}}>
                        <WrapperNavbar span={4}>
                            <NavbarComponent />
                        </WrapperNavbar>
                        <Col span={20} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} >
                            <WrapperProducts>
                                {products?.filter((pro) => {
                                    if(searchDebounce === '' ) {
                                        return pro
                                    } else if (pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                                        return pro
                                    }
                                })?.map((product) => {
                                    return (
                                        <CardComponent 
                                        key={product._id} 
                                        countInStock={product.countInStock} 
                                        description={product.description} 
                                        image={product.image} 
                                        name={product.name}
                                        price={product.price}
                                        rating={product.rating}
                                        type={product.type}
                                        sold={product.sold}
                                        discount={product.discount}
                                        id={product._id}
                                    />
                                    )
                                })}
                            </WrapperProducts>
                            <Pagination defaultCurrent={panigate.page + 1} total={panigate?.total} onChange={onChange} style={{textAlign: 'center', marginTop: '20px'}} />
                        </Col>
                    </Row>
                </div>
            </div>
        </Pending>
    )
}

export default TypeProductPage