import React, { useEffect } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/logo-login.webp'
import { Image } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Pending from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import CloudBackground from '../../components/CloudBackground/CloudBackground'

const SignUpPage = () => {

    const navigate = useNavigate()
    const handleNavigateSignin = () => {
        navigate('/sign-in')
    }
    const [isShowPassword, setIsShowPassword] = useState(false)
    // const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [isShowConfirmPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }

    const handleSignup = () => {
        mutation.mutate({ email, password, confirmPassword })
    }

    const mutation = useMutationHooks(
        data => UserService.signupUser(data)
    )

    const { data, isPending, isSuccess, isError  } = mutation

    useEffect(() => {
        if(isSuccess) {
            message.success()
            handleNavigateSignin()
        } else if(isError) {
            message.error()
        }
    }, [isSuccess, isError])

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh'}}>
            <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1}}>
                <CloudBackground />
            </div>
            <div style={{width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex'}}>
            <WrapperContainerLeft>
                <h1>Xin chào</h1>
                <p style={{ marginBottom: '20px'}} >Tạo tài khoản tại đây</p>
                <InputForm style={{marginBottom: '10px'}} placeholder="user@gmail.com" value={email} onChange={handleOnchangeEmail} />
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
                    <InputForm placeholder="Password" style={{marginBottom: '10px'}} type={isShowPassword ? "text" : "password"} 
                        value={password} onChange={handleOnchangePassword} 
                    />
                </div>
                <div style={{ position: 'relative'}}>
                    <span
                        style={{
                            zIndex: 10,
                            position: 'absolute',
                            top: '4px',
                            right: '8px'
                        }}
                    >
                    </span>
                    <InputForm placeholder="Confirm Password" type={isShowConfirmPassword ? "text" : "password"} value={confirmPassword} 
                        onChange={handleOnchangeConfirmPassword} 
                    />
                </div>
                
                { data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span> }
                <Pending isPending={isPending} >
                    <ButtonComponent
                        disabled={!email.length || !password.length || !confirmPassword.length}
                        onClick={handleSignup}
                        size={40}
                        styleButton={{
                            background: '#ed1b24',
                            height: '48px',
                            width: '100%',
                            border: 'none',
                            borderRadius: '4px',
                            margin: '26px 0 10px',
                        }}
                        textButton={'Đăng ký'}
                        styleTextButton={{color: '#fff', fontSize: '15px', fontWeight: '700'}}
                    ></ButtonComponent>
                </Pending>
                <p>Bạn đã có tài khoản? <WrapperTextLight onClick={ handleNavigateSignin }> Đăng nhập</WrapperTextLight></p>
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

export default SignUpPage