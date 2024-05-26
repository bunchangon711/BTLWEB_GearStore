import React, { useEffect } from 'react'
import { Cloud, WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/logo-login.webp'
import { Image } from 'antd'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Pending from '../../components/LoadingComponent/Loading'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'
import CloudBackground from '../../components/CloudBackground/CloudBackground'

const SignInPage = () => {

    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const location = useLocation()

    const navigate = useNavigate()

    const mutation = useMutationHooks(
        data => UserService.loginUser(data)
    )

    const { data, isPending, isSuccess } = mutation

    useEffect(() => {
        if(isSuccess){
            if(location?.state) {
                navigate(location?.state)
            }
            else {
                navigate('/')
            }
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            if(data?.access_token) {
                const decoded = jwtDecode(data?.access_token)
                console.log('decoded', decoded)
                if(decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token )
                }
            }
        }
    }, [ isSuccess ])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }


    const handleNavigateSignup = () => {
        navigate('/sign-up')
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const handleSignin = () => {
        mutation.mutate({
            email,
            password
        })
    }

    return ( 
          
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh'}}>
            <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1}}>
                <CloudBackground />
            </div>
            <div style={{width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex'}}>
            <WrapperContainerLeft>
                <h1>Xin chào</h1>
                <p style={{ marginBottom: '20px'}}>Đăng nhập tại đây</p>
                <InputForm 
                    style={{marginBottom: '10px'}} 
                    placeholder="user@gmail.com" 
                    value={email} 
                    onChange={handleOnchangeEmail} 
                />
                <div style={{ position: 'relative'}}>
                    <span
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        style={{
                            zIndex: 10,
                            position: 'absolute',
                            top: '4px',
                            right: '8px'
                        }}
                    >
                    </span>
                    <InputForm 
                        placeholder="password" 
                        type={isShowPassword ? "text" : "password"} 
                        value={password} 
                        onChange={handleOnchangePassword} 
                    />
                </div>

                {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                <Pending isPending={isPending}>
                    <ButtonComponent
                        disabled={!email.length || !password.length}
                        onClick={handleSignin}
                        size={40}
                        styleButton={{
                            background: '#ed1b24',
                            height: '48px',
                            width: '100%',
                            border: 'none',
                            borderRadius: '4px',
                            margin: '26px 0 10px',
                        }}
                        textButton={'Đăng nhập'}
                        styleTextButton={{color: '#fff', fontSize: '15px', fontWeight: '700'}}
                    ></ButtonComponent>
                </Pending>
                <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
                <p>Chưa có tài khoản? <WrapperTextLight onClick={ handleNavigateSignup } > Tạo tài khoản</WrapperTextLight></p>
            </WrapperContainerLeft>
            <WrapperContainerRight>
                <Image src={imageLogo} preview={false} alt="image-logo" />
                <span style={{fontWeight: '700', marginTop: '15px'}}>All the gear you need</span>
                <span style={{fontWeight: '700'}}>at Gr.8TechStore</span>
            </WrapperContainerRight>
            </div>
        </div>
    )
}

export default SignInPage