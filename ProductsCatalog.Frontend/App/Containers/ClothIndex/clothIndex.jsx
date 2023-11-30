import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spin, Divider } from 'antd';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { getClothes } from './clothIndexActions.jsx';

const colsInfo = [
    {
        title: 'Picture',
        key: 'picture',
        width: '20%',
        render: (text, record) => (
            <img
                src={record.picture ? 'data:image/jpeg;base64,' + record.picture : '/images/image_error_full.png'} alt="Product Picture" style={{ width: "200px", height: "200px", borderRadius: "25px", objectFit: "cover" }}
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
        dataIndex: 'price',
        key: 'price',
        width: '10%'
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: '20%'
    },
    {
        title: 'Creation Time',
        dataIndex: 'creationTime',
        key: 'creationTime',
        width: '20%'
    },
];

function ClothIndex() {
    const [current, setCurrent] = React.useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        document.title = "Products Catalog - Clothes"
        dispatch(getClothes(new Object));
    }, []);

    function handleTableChange(pagination, filters, sorter) {
        dispatch(getClothes(pagination));

        setCurrent(pagination.current);
    }

    let clothesInfo = useSelector(state => state.clothIndexReducer.clothesInfo).map(item => ({ ...item, key: item.id }));
    let { isLoading, error, totalCount } = useSelector(state => state.clothIndexReducer);

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
            <Divider orientation={"center"}>Clothes List</Divider>
            <Table
                dataSource={clothesInfo}
                columns={colsInfo}
                loading={isLoading}
                pagination={{ total: totalCount, current: current }}
                onChange={handleTableChange}
                onRow={(record, index) => {
                    return {
                        onClick: (event) => {
                            navigate("/cloth/read/" + record.id)
                        }
                    }
                }}
            />
        </div>
    );
};

export default ClothIndex;