import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Space } from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Pending from '../LoadingComponent/Loading'
import ModalComponent from '../ModalComponent/ModalComponent'
import { getBase64 } from '../../utils'
import * as message from '../../components/Message/Message'
import { useSelector } from 'react-redux'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as UserService from '../../services/UserService'
import { useQuery } from '@tanstack/react-query'

const AdminUser = () => {

    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isPendingUpdate, setIsPendingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);


    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
        address: '',
        avatar: '',
    });

    const [form] = Form.useForm();

    // const mutation = useMutationHooks(
    //     (data) => {
    //         const { name, type, countInStock, price, rating, description, image } = data
    //         const res = UserService.signupUser({name, type, countInStock, price, rating, description, image})
    //         return res
    //     }
    // )

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, token, ...rests } = data
            const res = UserService.updateUser( id, {...rests}, token )
            return res
        },
    )

    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id, token } = data
            const res = UserService.deleteUser( id, token )
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids } = data
            const res = UserService.deleteManyUser( ids, token )
            console.log('data', ids, token)
            return res
        },
    )

    const handleDeleteManyUsers = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token}, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }

    const getAllUsers = async () => {
        const res = await UserService.getAllUser(user?.access_token)
        return res
    }

    const fetchGetDetailsUser = async (rowSelected) => {
        const res = await UserService.getDetailsUser(rowSelected)
        if(res?.data) {
            setStateUserDetails({
                name: res?.data?.name,
                email: res?.data?.email,
                phone: res?.data?.phone,
                isAdmin: res?.data?.isAdmin,
                address: res?.data?.address,
                avatar: res?.data?.avatar,
            })
        }
        setIsPendingUpdate(false)
    }

    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])

    useEffect(() => {
        if(rowSelected && isOpenDrawer) {
            fetchGetDetailsUser(rowSelected)
            setIsPendingUpdate(true)
        }
    }, [rowSelected, isOpenDrawer])


    const handleDetailsUser = () => {
        // if(rowSelected) {
        //     fetchGetDetailsUser()
        // }
        //Commented this out because beyond the first getDetails it will duplicate the req
        setIsOpenDrawer(true)
    }

    // const { data, isPending, isSuccess, isError } = mutation
    // const { data: dataUpdated, isPending : isPendingUpdated , isSuccess : isSuccessUpdated , isError : isErrorUpdated, isSettled : isSettledUpdated } = mutationUpdate
    const { data: dataUpdated, isPending : isPendingUpdated , isSuccess : isSuccessUpdated , isError : isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isPending : isPendingDeleted , isSuccess : isSuccessDeleted , isError : isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isSuccess : isSuccessDeletedMany , isError : isErrorDeletedMany } = mutationDeletedMany

    //Tanstack v5 change useQuery syntax
    const queryUser = useQuery( {queryKey: ['users'], queryFn: getAllUsers}) 
    const { isPending: isPendingUsers, data: users } = queryUser
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsUser} />
            </div>
        )
    }

    //Code from ant.design for search function
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
      };
      const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
      };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div
            style={{
              padding: 20,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <InputComponent
            //   ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                  backgroundColor: 'rgb(208, 2, 27)'
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? 'rgb(208, 2, 27)' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     // <Highlighter
        //     //   highlightStyle={{
        //     //     backgroundColor: '#ffc069',
        //     //     padding: 0,
        //     //   }}
        //     //   searchWords={[searchText]}
        //     //   autoEscape
        //     //   textToHighlight={text ? text.toString() : ''}
        //     // />
        //   ) : (
        //     text
        //   ),
      });


    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          ...getColumnSearchProps('name')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            ...getColumnSearchProps('email')
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                  text: 'TRUE',
                  value: 'true',
                },
                {
                  text: 'FALSE',
                  value: 'false',
                },
            ],
            onFilter: (value, record) => {
                if(value === 'true') {
                    return record.isAdmin == 'TRUE'
                } else if (value === 'false') {
                    return record.isAdmin == 'FALSE'
                }
            },
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          ...getColumnSearchProps('phone')
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    const dataTable = users?.data?.length && users?.data?.map((user) => {
        return {...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE' }
    })
         
    //For creating
    // useEffect(() => {
    //     if(isSuccess && data?.status === 'OK') {
    //         message.success()
    //         handleCancel()
    //     } else if (isError) {
    //         message.error()
    //     }
    // }, [isSuccess])


    //For updating
    useEffect(() => {
        if(isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success()
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessUpdated])

    // //Attempt to fix isSettled removed in tanstack useQuery v5
    // useEffect(() => {
    //     if (isSettledUpdated) {
    //        queryUser.refetch() 
    //     }
    //   }, [isSettledUpdated]);

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        })
        form.resetFields()
    };

    //For deleting user
    useEffect(() => {
        if(isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDeleted])

    useEffect(() => {
        if(isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            message.success()
        } else if (isErrorDeletedMany) {
            message.error()
        }
    }, [isSuccessDeletedMany])

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    const handleDeleteUser = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token}, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }


    //When changing user details
    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name] : e.target.value
        })
    }

    const handleOnchangeAvatarDetails = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj );
        }
        setStateUserDetails({
            ...stateUserDetails,
            avatar: file.preview
        })
    }

    const onUpdateUser = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateUserDetails}, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }

    return (
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style={{marginTop: '25px'}}>  
                <TableComponent handleDeleteMany={handleDeleteManyUsers} columns={columns} isPending={isPendingUsers} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                    onClick: (event) => {
                        setRowSelected(record._id)
                    }
                    };
                 }}/>
            </div>
            
            <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="60%">
                <Pending isPending={isPendingUpdate || isPendingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                        style={{ maxWidth: 1500 }}
                        onFinish={onUpdateUser}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                        label="Name:"
                        name="name"
                        rules={[{ required: true, message: 'Please input the user name!' }]}
                        >
                        <InputComponent style={{border: '1px #ccc solid'}} value={stateUserDetails.name} onChange={handleOnChangeDetails} name="name" />
                        </Form.Item>

                        <Form.Item
                        label="Email:"
                        name="email"
                        rules={[{ required: true, message: 'Please input the user email!' }]}
                        >
                        <InputComponent style={{border: '1px #ccc solid',}} value={stateUserDetails.email} onChange={handleOnChangeDetails} name="email" />
                        </Form.Item>
                        
                        <Form.Item
                        label="Phone:"
                        name="phone"
                        rules={[{ required: true, message: 'Please input the user phone!' }]}
                        >
                        <InputComponent style={{border: '1px #ccc solid',}} value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
                        </Form.Item>

                        <Form.Item
                        label="Address:"
                        name="address"
                        rules={[{ required: true, message: 'Please input the user address!' }]}
                        >
                        <InputComponent style={{border: '1px #ccc solid',}} value={stateUserDetails.address} onChange={handleOnChangeDetails} name="address" />
                        </Form.Item>

                        <Form.Item
                        label="Avatar:"
                        name="avatar"
                        rules={[{ required: true, message: 'Please input the user Avatar!' }]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1} style={{ display: 'flex' }} >
                                <Button >Select File</Button>
                                {stateUserDetails?.avatar && (
                                <img src={stateUserDetails?.avatar} style={{
                                    height: '100px',
                                    width: '100px',
                                    objectFit: 'cover',
                                    marginLeft: '20px',
                                    float: 'right'
                                    }} alt="avatar" />
                                )}
                            </WrapperUploadFile>  
                        </Form.Item>


                        <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{width: '300px', height: '40px'}} >
                            Update
                        </Button>
                        </Form.Item>
                    </Form>
                </Pending>
            </DrawerComponent>

            <ModalComponent forceRender title="Xóa tài khoản người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser} style={{marginTop: '250px'}}>
                <Pending isPending={isPendingDeleted}>
                    <div>Bạn có chắc muốn xóa tài khoản này không?</div>
                </Pending>
            </ModalComponent>
          
        </div>
    )
}

export default AdminUser