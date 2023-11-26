import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Menu, Layout } from 'antd';

const { Sider } = Layout;

const items = [
    {
        key: "1",
        label: <Link to={"/device/index"}>Devices</Link>
    },
    {
        key: "2",
        label: <Link to={"/cloth/index"}>Clothes</Link>
    },
    {
        key: "a",
        label: <Link to={"/product/create"}>Add Product</Link>
    }
]

export default class Header extends React.Component {
    

    render() {
        return (
            <Sider>
                <div className="logo"></div>
                <Menu
                    theme="dark"
                    mode="inline"
                    items={ items }
                />
            </Sider>
        );
    }
}