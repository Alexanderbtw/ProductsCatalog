import React from 'react';
import { Divider, Popconfirm, Button } from 'antd';
import { Link } from "react-router-dom";
import { RollbackOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

function ProductSettings(props) {
    const root = props.productCathegory;

    return (
        <>
            <Divider orientation={"center"}>Settings</Divider>

            <div style={{ marginTop: "50px", fontWeight: "bold", display: "flex", flexDirection: "row", gap: "20px", justifyContent: "center" }}>
                <Link to={`/${root}/index`}>
                    <Button type="primary">
                        <RollbackOutlined />
                    </Button>
                </Link>
                <Link to={`/${root}/edit`}>
                    <Button type="primary">
                        <EditOutlined />
                    </Button>
                </Link>
                <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => props.deleteHandler(props.productInfo.id)}
                >
                    <Button type="primary">
                        <DeleteOutlined />
                    </Button>
                </Popconfirm>
            </div>
        </>
    );
}

export default ProductSettings;