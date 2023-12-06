import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { UserOutlined, LoginOutlined, UserAddOutlined, LogoutOutlined, HomeOutlined } from "@ant-design/icons";

import SessionManager from './Auth/sessionManager.js';

const { Sider } = Layout;

const defaultItems = [
    {
        key: "notauth",
        label: <UserOutlined />,
        children: [
            {
                key: "/",
                label: <Link to={"/"}><LoginOutlined /> Login</Link>
            },
            {
                key: "/register",
                label: <Link to={"/register"}><UserAddOutlined /> Register</Link>
            }
        ]
    }
]

const userItems = [
    {
        key: "isauth",
        label: <UserOutlined />,
        children: [
            {
                key: "/home",
                label: <Link to={"/home"}><HomeOutlined /> Home</Link>
            },
            {
                key: "/logout",
                label: <><LogoutOutlined /> Logout</>,
                danger: true
            }
        ]
    },
    {
        key: "/Device/index",
        label: <Link to={"/Device/index"}>Devices</Link>
    },
    {
        key: "/Cloth/index",
        label: <Link to={"/Cloth/index"}>Clothes</Link>
    }
]

const adminItems = [
    ...userItems,
    {
        key: "/product/create",
        label: <Link to={"/product/create"}>Add Product</Link>
    }
]

function SideMenu() {
    const [selectedKey, setKey] = React.useState(window.location.pathname);
    const [items, setItems] = React.useState(defaultItems);
    const location = useLocation();
    const navigate = useNavigate();

    function handleClick({ key }) {
        if (key == "/logout") {
            SessionManager.removeUserSession();
            navigate("/");
        }
    }

    React.useEffect(() => {
        setKey(location.pathname);
    }, [location]);

    React.useEffect(() => {
        const { roles } = SessionManager.getUserSession();
        if (roles) {
            if (roles.includes("Admin")) {
                setItems(adminItems);
            } else {
                setItems(userItems);
            }
        } else {
            setItems(defaultItems);
        }
    }, [SessionManager.isAuth()]);

    return (
        <Sider>
            <div className="logo"></div>
            <Menu
                defaultSelectedKeys={[window.location.pathname]}
                selectedKeys={[selectedKey]}
                theme="dark"
                mode="vertical"
                items={items}
                onClick={handleClick}
            />
        </Sider>
    );
}

export default SideMenu;