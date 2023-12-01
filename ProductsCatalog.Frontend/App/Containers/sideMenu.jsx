import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { HomeOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const items = [
    {
        key: "/",
        label: <Link to={"/"}><HomeOutlined /></Link>
    },
    {
        key: "/device/index",
        label: <Link to={"/device/index"}>Devices</Link>
    },
    {
        key: "/cloth/index",
        label: <Link to={"/cloth/index"}>Clothes</Link>
    },
    {
        key: "/product/create",
        label: <Link to={"/product/create"}>Add Product</Link>
    }
]

function SideMenu() {
    const [selectedKey, setKey] = React.useState(window.location.pathname);
    const location = useLocation();

    React.useEffect(() => {
        setKey(location.pathname);
    }, [location]);

    return (
        <Sider>
            <div className="logo"></div>
            <Menu
                defaultSelectedKeys={[window.location.pathname]}
                selectedKeys={[selectedKey]}
                theme="dark"
                mode="inline"
                items={items}
            />
        </Sider>
    );
}

export default SideMenu;