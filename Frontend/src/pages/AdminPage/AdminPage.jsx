import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utils';
import {
    UserOutlined,
    AppstoreOutlined,
    // SettingOutlined,

} from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';

const AdminPage = () => {
    // const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    // const onOpenChange = (openKeys) => {
    //   const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    //   // open
    //   if (currentOpenKey !== undefined) {
    //     const repeatIndex = openKeys
    //       .filter((key) => key !== currentOpenKey)
    //       .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
    //     setStateOpenKeys(
    //       openKeys
    //         // remove repeat key
    //         .filter((_, index) => index !== repeatIndex)
    //         // remove current level all child
    //         .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
    //     );
    //   } else {
    //     // close
    //     setStateOpenKeys(openKeys);
    // };

    const items = [
        getItem('Người dùng', 'user', <UserOutlined style={{fontSize: '22px'}} />),
        getItem('Sản phẩm', 'product', <AppstoreOutlined style={{fontSize: '22px'}} />)
    ];

    // const rootSubmenuKeys = ['user', 'product'];
    // const [openKeys, setOpenKeys] = useState(['user']);
    const [keySelected, setKeySelected] = useState('')

    const renderPage = (key) => {
        switch(key) {
            case 'user':
                return (
                    <AdminUser />
                )
            case 'product':
                return (
                    <AdminProduct />
                )
            default:
                return <></>
        }
    }

    // const onOpenChange = (keys) => {
    //     const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    //     if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //         setOpenKeys(keys);
    //     } else {
    //         setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    //     }
    // };

    const handleOnClick = ({ key }) => {
        setKeySelected(key)
    }
    console.log('keySelected', keySelected)

    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenPhone isHiddenLocation isHiddenCart />
            <div style={{ display: 'flex' }} >
                <Menu
                    mode="inline"
                    // openKeys={openKeys}
                    // onOpenChange={onOpenChange}
                    style={{
                        // width: 256,
                        boxShadow: '1px 1px 6px #ccc',
                        width: '300px',
                        fontSize: '20px',
                        fontWeight: '500',
                        height: '100vh',
                    }}
                    items={items}
                    onClick={handleOnClick}
                />
                <div style={{ flex: '1', padding: '30px' }}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    )
}

export default AdminPage