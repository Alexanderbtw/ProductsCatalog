import React from 'react';
import { Descriptions, Row, Col, Image } from 'antd';

function Product(props) {
    return (
        <Row>
            <Col span={4}>
                <Image
                    src={ props.productInfo.picture ? 'data:image/jpeg;base64,' + props.productInfo.picture : '/images/image_error_full.png' }
                    alt="Not Found"
                />
            </Col>
            <Col span={20}>
                <Descriptions bordered column={2}>
                    {Object.keys(props.productInfo).map(key => (
                        props.productInfo[key] && key != 'picture' ?
                        <Descriptions.Item key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>{props.productInfo[key]}</Descriptions.Item> : null
                    ))};
                </Descriptions>
            </Col>
        </Row>
    );
};

export default Product;