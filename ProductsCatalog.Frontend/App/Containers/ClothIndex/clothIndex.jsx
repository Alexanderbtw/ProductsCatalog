import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spin, Divider } from 'antd';
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

import { getClothes } from './clothIndexActions.jsx';

const colsInfo = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title'
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
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Link to={"/cloth/read/" + record.id}><SearchOutlined /> View</Link>
        )
    }
];

function ClothIndex() {
    const [current, setCurrent] = React.useState(1);
    const dispatch = useDispatch();

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
            />
        </div>
    );
};

export default ClothIndex;