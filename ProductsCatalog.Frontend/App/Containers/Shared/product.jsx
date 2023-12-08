import React from 'react';
import { Descriptions, Row, Col, Image, Card } from 'antd';
const { Meta } = Card;

const mainKeys = ['title', 'price', 'description', 'picture']

function Product(props) {
    const title = (
        <>
            <span>
                {props.productInfo.title}
            </span>
            <span
                style={{ float: "right", color: "green" }}
            >
                ${props.productInfo.price}
            </span>
        </>
    );

    const descItems = Object.keys(props.productInfo).filter(key => props.productInfo[key] && mainKeys.indexOf(key) == -1).map(key => {
        let value = props.productInfo[key];

        if (key == "creationTime") {
            value = new Date(value).toLocaleString();
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
                <Card
                    style={{ height: "500px" }}
                    cover={
                        <Image
                            style={{ height: "300px", objectFit: "cover" }}
                            fallback='/images/image_error_full.png'
                            src={'data:image/jpeg;base64,' + props.productInfo.picture}
                            alt="Not Found"
                        />
                    }
                >
                    <Meta
                        title={title}
                        description={props.productInfo.description}
                    />
                </Card>

               
            </Col>
            <Col span={16}>
                <Descriptions
                    bordered
                    layout='horizontal'
                    column={1}
                    items={descItems}
                />
            </Col>
        </Row>
    );
};

export default Product;