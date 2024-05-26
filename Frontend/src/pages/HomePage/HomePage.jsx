import React, { useEffect, useRef, useState } from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import slider4 from '../../assets/images/slider4.webp'
import slidersmall1 from '../../assets/images/slidersmall1.webp'
import slidersmall2 from '../../assets/images/slidersmall2.webp'
import slidersmall3 from '../../assets/images/slidersmall3.webp'
import slidersmallright1 from '../../assets/images/slidersmallright1.jpg'
import slidersmallright2 from '../../assets/images/slidersmallright2.jpg'
import slidersmallright3 from '../../assets/images/slidersmallright3.jpg'
import CardComponent from '../../components/CardComponent/CardComponent'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux'
import Pending from '../../components/LoadingComponent/Loading'
import { useDebounce } from '../../hooks/useDebounce'
import StickyComponent from '../../components/StickyComponent/StickyComponent'
import SliderComponentSmall from '../../components/SliderComponent/SliderComponentSmall'
import SliderComponentSmallRight from '../../components/SliderComponent/SliderComponentSmallRight'

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 0)
    const refSearch = useRef()
    const [pending, setPending] = useState(false)
    const [limit, setLimit] = useState(12)                  //Set this to change the limit of products appear each time the more button is pressed
    const [typeProducts, setTypeProducts] = useState([])

    const fetchProductAll = async (context) => {
    //  if(search.length > 0) {}
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductService.getAllProduct(search, limit)
        // if(search?.length > 0 || refSearch.current) {
        //     setStateProducts(res?.data)
        //     return []
        // } else {
            
        // }
        return res
    }
    
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if(res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }

    //keepPreviousData now have to import in tanstack v5 and use placeholderData instead of it
    const {isPending, data: products} = useQuery({ queryKey: ['product', limit, searchDebounce], queryFn: fetchProductAll, ...{ retry: 3, retryDelay: 1000, placeholderData: keepPreviousData } })             
    // Tanstack v5 -useQuery(key, fn, options) + useQuery({ queryKey, queryFn, ...options })


    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    var count = 0;
    // useEffect(() => {
    //     if(products?.data?.length > 0) {
    //         setStateProducts(products?.data)
    //     }
    // }, [products])
  
    // const {isPending, data} = useQuery(['products'], fetchProductAll)

    return (
        <Pending isPending={isPending || pending}>
            <div style={{width: '100%', margin: '0 auto', backgroundColor: '#000000', height: '50px'}}>
                <WrapperTypeProduct>
                    {typeProducts.map((item) => {
                        return (
                            <TypeProduct name = {item} key={item} />
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div className='body' style={{width: '100%', backgroundColor: '#efefef'}}>
                <StickyComponent />
                <div id="container" style={{ width: '1270px', margin: '0 auto', marginTop: '25px'}}>
                    <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />
                    <div style={{display: 'flex'}} >
                        <SliderComponentSmall arrImages={[slidersmall1, slidersmall2, slidersmall3 ]}/>
                        <SliderComponentSmallRight arrImages={[slidersmallright1, slidersmallright2, slidersmallright3 ]}/>
                    </div>
                    <WrapperProducts>
                        {/* {products?.data?.map((product) => { */}
                        {products?.data?.map((product) => {
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
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px'}}> 
                        <WrapperButtonMore
                            textButton="Xem thêm" type="outline" styleButton={{
                            border: `${(products?.total === products?.data?.length || products?.totalPage === 1) ? 'none' : '1px solid #d0021b'}`, 
                            color: '#d0021b',
                            backgroundColor: `${(products?.total === products?.data?.length || products?.totalPage === 1) ? '#ccc' : '#fff'}`,
                            width: '240px', height: '38px', borderRadius: '4px',
                            marginTop: '20px',
                        }}
                        disabled={products?.total === products?.data?.length || products?.totalPage === 1} 
                        styleTextButton={{ fontWeight: 500, color: (products?.total === products?.data?.length || products?.totalPage === 1) && '#fff'}}
                        onClick={() => {
                            count++
                            setLimit((prev) => prev + 12)
                        }
                        }
                        />
                    </div>
                </div>
            </div>
        </Pending>
    )
}

export default HomePage