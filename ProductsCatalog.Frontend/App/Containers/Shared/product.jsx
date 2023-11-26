import React from 'react';
import { Descriptions, Row, Col } from 'antd';

function Product(props) {
    return (
        <Row>
            <Col span={4}>
            </Col>
            <Col span={20}>
                <Descriptions bordered column={2}>
                    {Object.keys(props.productInfo).map(key => (
                        <Descriptions.Item key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>{props.productInfo[key]}</Descriptions.Item>
                    ))};
                </Descriptions>
            </Col>
        </Row>
    );
};

export default Product;