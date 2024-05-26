import { Badge, Button, Col, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { WraperHeaderAccount, WraperHeaderCart, WraperHeaderMap, WraperHeaderPhone, WrapperContentLocation, WrapperContentPopup, WrapperContentPopupLocation, WrapperContentPopupLocationBold, WrapperHeader, WrapperTextHeader } from './style'
import Search from 'antd/es/transfer/search'
import {
    UserOutlined,
    CaretDownOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    ShoppingCartOutlined,
    CodeSandboxOutlined
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import Pending from '../LoadingComponent/Loading';
import { searchProduct } from '../../redux/slides/productSlide';

const HeaderComponent = ({isHiddenSearch = false, isHiddenPhone = false, isHiddenLocation = false, isHiddenCart = false}) => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')
    const order = useSelector((state) => state.order)
    const [pending, setPending] = useState(false)
    const handleNavigateLogin = () => {
        navigate('sign-in')
    }

    const handleLogout = async () => {
        setPending(true)
        await UserService.logoutUser()
        localStorage.removeItem('access_token')    //Thêm vào để giải quyết lỗi 404 khi load vào giao diện chính do handleGetDetailsUser
        dispatch(resetUser())                      //dùng access_token cũ vẫn lưu trong local để đăng nhập (Should check it again if anything happens)
        setPending(false)
    }

    useEffect(() => {
        setPending(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setPending(false)
    }, [user?.name, user?.avatar])

    const content = (
        <div>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => navigate('/system/admin')} >Quản lí hệ thống</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={() => navigate('/profile-user')} >Thông tin tài khoản</WrapperContentPopup>
            <WrapperContentPopup onClick={handleLogout} >Đăng xuất</WrapperContentPopup>
        </div>
    );

    const contentLocation = (
        <WrapperContentLocation>
            <div style={{marginBottom: '5px', textTransform: 'uppercase', fontSize: '17px', margin: '0 0 13px 0', fontWeight: '500', lineHeight: 'normal', textAlign: 'center'}}>Tìm cửa hàng gần bạn</div>
            <WrapperContentPopupLocationBold>Hà Nội - Gr.8TechStore</WrapperContentPopupLocationBold>
            <div>
                <WrapperContentPopupLocation>
                    <p>5th Floor, A1 Building Km 10, Đ. Nguyễn Trãi </p>
                    <p>&#128222; 0846362067</p>
                    <p>Thời gian hoạt động: 9:00 - 20:00</p>
                </WrapperContentPopupLocation>
            </div>
        </WrapperContentLocation>
    );

    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    }

    const handleNavigateHomepage = () => {
        navigate('/')
    }

    return (
        <div style={{ width: '100%', background: 'rgb(208, 2, 27)', justifyContent: 'center'}}>
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }} >
                <Col span={5}>
                    <WrapperTextHeader onClick={() => handleNavigateHomepage()} style={{cursor: 'pointer'}}> <CodeSandboxOutlined style={{ fontSize: '30px', color: '#fff'}}/> Gr.8TechStore</WrapperTextHeader>
                </Col>
                {!isHiddenSearch && (
                    <Col span={9}>
                        <ButtonInputSearch
                            size="large"
                            textButton="Tìm kiếm"
                            placeholder="input search text"
                            variant={'borderless'}
                            onChange={onSearch}
                        />
                    </Col>
                )}
                <Col span={10} style={{display: 'flex', gap: '30px', alignItems: 'center'}}>
                    {!isHiddenPhone && (
                        <WraperHeaderPhone> 
                            <PhoneOutlined style={{ fontSize: '30px'}}/>
                            <div>
                                <span>Hotline</span>
                                <div>
                                    <span>0846362067</span>
                                </div>
                            </div>
                        </WraperHeaderPhone>
                    )}
                    {!isHiddenLocation && (
                        <WraperHeaderMap>
                            <EnvironmentOutlined style={{ fontSize: '30px'}}/>
                            <Popover content={contentLocation} trigger="hover" >
                                <div>
                                    <span>Hệ thống</span>
                                    <div>
                                        <span>Cửa hàng</span>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            </Popover>
                        </WraperHeaderMap>
                    )}
                    <Pending isPending={pending}>
                        <WraperHeaderAccount style={{ marginLeft: isHiddenSearch && isHiddenSearch ? '340px' : '0px' }} > 
                            {userAvatar? (
                                <img src={userAvatar} alt="avatar" style={{
                                    height: '40px',
                                    width: '40px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                }} 
                                />
                            ) : (
                                <UserOutlined style={{ fontSize: '30px'}}/>
                            )}
                            {user?.access_token ? (
                                <>
                                <Popover content={content} trigger="hover" >
                                    <div style={{ cursor: 'pointer' }}>{ userName?.length ? userName : user?.email }</div>
                                </Popover>
                                </>
                            ) : (
                                <a href="http://localhost:3000/sign-in" style={{ cursor: 'pointer', color: '#fff' }}>
                                    <span>Đăng nhập</span>
                                    <div>
                                        <span>Đăng kí</span>
                                        <CaretDownOutlined />
                                    </div>
                                </a>
                            )}                   
                        </WraperHeaderAccount>
                    </Pending>
                    {!isHiddenCart && (
                        <WraperHeaderCart onClick={() => navigate('/order')} >
                            <Badge count={order?.orderItems?.length} size="small" >
                                <ShoppingCartOutlined style={{ fontSize: '35px', color: '#fff'}}/>
                            </Badge>
                            <div>
                                <span>Giỏ hàng</span>                     
                            </div>
                        </WraperHeaderCart>
                    )}
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent