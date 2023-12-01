import React from 'react';
import { Descriptions, Row, Col, Image } from 'antd';

function Product(props) {
    const items = Object.keys(props.productInfo).filter(key => props.productInfo[key] && key != 'picture').map(key => {
        let value = props.productInfo[key];

        if (key == "creationTime") {
            value = new Date(value).toLocaleString();
        }
        else if (key == "price") {
            value = "$" + value;
        } 

        return (
            {
                key: key,
                label: key.charAt(0).toUpperCase() + key.slice(1),
                children: value
            }
        );
    });

    return (
        <Row gutter={[16, 16]}>
            <Col span={8}>
                <Image
                    fallback='/images/image_error_full.png'
                    src={'data:image/jpeg;base64,' + props.productInfo.picture}
                    alt="Not Found"
                    style={{ borderRadius: "8px" }}
                />
            </Col>
            <Col span={16}>
                <Descriptions
                    bordered
                    layout='horizontal'
                    column={1}
                    items={items}
                />
            </Col>
        </Row>
    );
};

export default Product;