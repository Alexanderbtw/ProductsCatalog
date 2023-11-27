import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spin, Divider } from 'antd';
import { Link } from "react-router-dom";

import { getDevices } from './deviceIndexActions.jsx';

const colsInfo = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Title',
        key: 'title',
        render: (text, record) => (
            <Link to={"/device/read/" + record.id}>{record.title}</Link>
        )
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
    },
    {
        title: 'Creation Time',
        dataIndex: 'creationTime',
        key: 'creationTime'
    },
    {
        title: 'Cathegory',
        dataIndex: 'cathegory',
        key: 'cathegory'
    }
];

function DeviceIndex() {
    const [current, setCurrent] = React.useState(1);
    const dispatch = useDispatch();

    React.useEffect(() => {
        document.title = "Products Catalog - Devices"
        dispatch(getDevices(new Object));
    }, []);

    function handleTableChange(pagination, filters, sorter) {
        dispatch(getDevices(pagination));

        setCurrent(pagination.current);
    }

    let devicesInfo = useSelector(state => state.deviceIndexReducer.devicesInfo).map(item => ({ ...item, key: item.id }));
    let { isLoading, error, totalCount } = useSelector(state => state.deviceIndexReducer);

    if (isLoading) {
        return (
            <div style={{ textAlign: "center", marginTop: "200px" }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div>Error in data loading: {error}</div>
        );
    }

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Divider orientation={"center"}>Devices List</Divider>
            <Table
                dataSource={devicesInfo}
                columns={colsInfo}
                loading={isLoading}
                pagination={{ total: totalCount, current: current }}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default DeviceIndex;