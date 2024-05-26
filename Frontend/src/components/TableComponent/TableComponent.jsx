import { Table } from 'antd';
import React, { useMemo, useState } from 'react'
import Pending from '../LoadingComponent/Loading';
import { Excel } from "antd-table-saveas-excel";
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const TableComponent = (props) => {
    const {selectionType = 'checkbox', data: dataSource = [], isPending = false, columns = [], handleDeleteMany } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    //Tạo mảng columns mới bỏ đi cột action để truyền vào addColumns trong function exportExcel
    const newColumnExport = useMemo(() => {
        const arr = columns?.filter((col) => col.dataIndex !== 'action')
        return arr
    }, [columns])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User',
        //   // Column configuration not to be checked
        //   name: record.name,
        // }),
    };

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys)
    }

    const exportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("test")
            .addColumns(newColumnExport)
            .addDataSource(dataSource, {
                str2Percent: true
            })
            .saveAs("Excel.xlsx");
    };


    return (
        <Pending isPending={isPending}>
            {rowSelectedKeys.length > 1 && (
                <div style={{ background: 'rgb(208, 2, 27)', color: '#fff',
                    fontWeight: 'bold',
                    padding: '15px',
                    cursor: 'pointer'
                }}
                    onClick={handleDeleteAll}
                >
                    Xóa tất cả
                </div>
            )}
            <Table
                rowSelection={{
                type: selectionType,
                ...rowSelection,
                }}
                columns={columns}
                dataSource={dataSource}
                {...props}
            />
            
            <ButtonComponent 
            size={40}
            styleButton={{
                background: 'rgb(208, 2, 27)',
                height: '48px',
                width: '220px',
                border: 'none',
                borderRadius: '4px'
            }}
            textButton={'Xuất excel'}
            styleTextButton={{color: '#fff', fontSize: '15px', fontWeight: '700'}}
            onClick={exportExcel} />
        </Pending>
    )
}

export default TableComponent
    