import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spin, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

import { getDevices } from './deviceIndexActions.jsx';

const colsInfo = [
    {
        title: 'Picture',
        key: 'picture',
        width: '10%',
        render: (text, record) => (
            <img
                src={record.picture ? 'data:image/jpeg;base64,' + record.picture : '/images/image_error_full.png'} alt="Product Picture" style={{ width: "150px", height: "150px", borderRadius:"25px", objectFit:"cover" }}
            />
        )
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: '20%'
    },
    {
        title: 'Cathegory',
        dataIndex: 'cathegory',
        key: 'cathegory',
        width: '10%'
    },
    {
        title: 'Price',
        key: 'price',
        width: '15%',
        render: (text, record) => (
            <>{"$" + record.price}</>
        )
        
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: '25%'
    },
    {
        title: 'Creation Date',
        key: 'creationTime',
        width: '20%',
        render: (text, record) => (
            <>{new Date(record.creationTime).toLocaleDateString()}</>
        )
    },
];

function DeviceIndex() {
    const [current, setCurrent] = React.useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                onRow={(record, index) => {
                    return {
                        onClick: (event) => {
                            navigate("/device/read/" + record.id)
                        }
                    }
                }}
            />
        </div>
    );
};

export default DeviceIndex;