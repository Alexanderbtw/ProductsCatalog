import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { UserOutlined, LoginOutlined, UserAddOutlined, LogoutOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const defaultItems = [
    {
        key: "auth",
        label: <UserOutlined />,
        children: [
            {
                key: "/",
                label: <Link to={"/"}><LoginOutlined /> Login</Link>
            },
            {
                key: "/register",
                label: <Link to={"/register"}><UserAddOutlined /> Register</Link>
            },
            {
                key: "/logout",
                label: <Link to={"/logout"}><LogoutOutlined /> Logout</Link>,
                danger: true
            }
        ]
    }
]

const userItems = [
    ...defaultItems,
    {
        key: "/device/index",
        label: <Link to={"/device/index"}>Devices</Link>
    },
    {
        key: "/cloth/index",
        label: <Link to={"/cloth/index"}>Clothes</Link>
    }
]

const adminItems = [
    ...userItems,
    {
        key: "/product/create",
        label: <Link to={"/product/create"}>Add Product</Link>
    }
]

function SideMenu({ roles }) {
    const [selectedKey, setKey] = React.useState(window.location.pathname);
    const [items, setItems] = React.useState(defaultItems);
    const location = useLocation();

    React.useEffect(() => {
        setKey(location.pathname);
    }, [location]);

    React.useEffect(() => {
        if (roles) {
            if (roles.includes("Admin")) {
                setItems(adminItems);
            } else {
                setItems(userItems);
            }
        }
    }, [roles]);
    

    return (
        <Sider>
            <div className="logo"></div>
            <Menu
                defaultSelectedKeys={[window.location.pathname]}
                selectedKeys={[selectedKey]}
                theme="dark"
                mode="vertical"
                items={items}
            />
        </Sider>
    );
}

export default SideMenu;