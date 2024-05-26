import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Pending from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide'
import { Button, Upload } from 'antd'
// import { useQuery } from '@tanstack/react-query'
import {
    UploadOutlined,

} from '@ant-design/icons';
import { getBase64 } from '../../utils'
import CloudBackground from '../../components/CloudBackground/CloudBackground'

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    )

    const dispatch = useDispatch()
    const { data, isPending, isSuccess, isError } = mutation

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])

    useEffect(() => {
        if(isSuccess) {           //Check #32 50:29 again if cant fix
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if(isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }


    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }
    const handleOnchangeAvatar = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj );
        }
        setAvatar(file.preview)
    }

    // const { isLoading, isError } = useQuery()    //Attempt to fix
    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token })
    }

    return (
        <div style={{ width: '1480px', margin: '0 auto', height: '700px'}}>
            <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1}}>
                <CloudBackground />
            </div>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <Pending isPending={isPending}>
                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor="name">Name</WrapperLabel>
                        <InputForm
                            id="name"
                            style={{ width: '400px', borderRadius: '5px' }}
                            value={name} 
                            onChange={handleOnchangeName} 
                        />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '35px',
                                width: 'fit-content',
                                border: '1px solid #ed1b24',
                                borderRadius: '4px',
                                margin: '26px 0 10px',
                                padding: '5px 10px 10px',
                            }}
                            textButton={'Cập nhật thông tin'}
                            styleTextButton={{color: '#ed1b24', fontSize: '15px', fontWeight: '700'}}
                        ></ButtonComponent>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="email">Email</WrapperLabel>
                        <InputForm
                            id="email"
                            style={{ width: '400px', borderRadius: '5px' }}
                            value={email} 
                            onChange={handleOnchangeEmail} 
                        />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '35px',
                                width: 'fit-content',
                                border: '1px solid #ed1b24',
                                borderRadius: '4px',
                                margin: '26px 0 10px',
                                padding: '5px 10px 10px',
                            }}
                            textButton={'Cập nhật thông tin'}
                            styleTextButton={{color: '#ed1b24', fontSize: '15px', fontWeight: '700'}}
                        ></ButtonComponent>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                        <InputForm
                            id="phone"
                            style={{ width: '400px', borderRadius: '5px' }}
                            value={phone} 
                            onChange={handleOnchangePhone} 
                        />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '35px',
                                width: 'fit-content',
                                border: '1px solid #ed1b24',
                                borderRadius: '4px',
                                margin: '26px 0 10px',
                                padding: '5px 10px 10px',
                            }}
                            textButton={'Cập nhật thông tin'}
                            styleTextButton={{color: '#ed1b24', fontSize: '15px', fontWeight: '700'}}
                        ></ButtonComponent>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="address">Address</WrapperLabel>
                        <InputForm
                            id="address"
                            style={{ width: '400px', borderRadius: '5px' }}
                            value={address} 
                            onChange={handleOnchangeAddress} 
                        />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '35px',
                                width: 'fit-content',
                                border: '1px solid #ed1b24',
                                borderRadius: '4px',
                                margin: '26px 0 10px',
                                padding: '5px 10px 10px',
                            }}
                            textButton={'Cập nhật thông tin'}
                            styleTextButton={{color: '#ed1b24', fontSize: '15px', fontWeight: '700'}}
                        ></ButtonComponent>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1} >
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </WrapperUploadFile>
                        {avatar && (
                            <img src={avatar} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt="avatar" />
                        )}
                        {/* <InputForm
                            id="avatar"
                            style={{ width: '400px', borderRadius: '5px' }}
                            value={avatar} 
                            onChange={handleOnchangeAvatar} 
                        /> */}
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '35px',
                                width: 'fit-content',
                                border: '1px solid #ed1b24',
                                borderRadius: '4px',
                                margin: '26px 0 10px',
                                padding: '5px 10px 10px',
                            }}
                            textButton={'Cập nhật thông tin'}
                            styleTextButton={{color: '#ed1b24', fontSize: '15px', fontWeight: '700'}}
                        ></ButtonComponent>
                    </WrapperInput>
                </WrapperContentProfile>
            </Pending>
        </div>
    )
}

export default ProfilePage