import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import DeviceRead from './DeviceRead/deviceRead.jsx';
import DeviceIndex from './DeviceIndex/deviceIndex.jsx'
import ClothRead from './ClothRead/clothRead.jsx';
import ClothIndex from './ClothIndex/clothIndex.jsx';
import ProductCreate from './ProductCreate/productCreate.jsx';
import DeviceCreate from './ProductCreate/deviceCreate.jsx';
import ClothCreate from './ProductCreate/clothCreate.jsx';
import SideMenu from './sideMenu.jsx';
import Login from './Auth/login.jsx';
import Register from './Auth/register.jsx';
import Logout from './Auth/logout.jsx';
import Home from './home.jsx';

const { Content, Footer } = Layout

function App() {
    const [userRoles, setRoles] = React.useState(undefined);

    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <SideMenu roles={ userRoles } />
                <Layout className="site-layout">
                    <Content style={{ margin: "0 16px" }}>
                        <div style={{ marginTop: "35px" }}>
                            <h2 style={{ marginTop: "30px", textAlign: "center" }}>{document.title}</h2>
                            <hr></hr>

                            <Routes>
                                <Route index path="/" element={<Login />} />
                                <Route path="/home" element={<Home roles={ userRoles } setRoles={ setRoles } />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/logout" element={<Logout setRoles={ setRoles } />} />
                                <Route path="/device/index" element={<DeviceIndex />} />
                                <Route path="/device/read/:id" element={<DeviceRead />} />
                                <Route path="/cloth/index" element={<ClothIndex />} />
                                <Route path="/cloth/read/:id" element={<ClothRead />} />
                                <Route path="/product/create" element={<ProductCreate />} />
                                <Route path="/device/edit" element={<DeviceCreate />} />
                                <Route path="/cloth/edit" element={<ClothCreate />} />
                            </Routes>
                        </div>

                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                        &copy; Alexander Goldebaev, 2023
                    </Footer>
                </Layout>
            </Layout>
        </Router>
    );
}

export default App;