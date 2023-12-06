import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import ProductIndex from './ProductIndex/productIndex.jsx';
import ProductRead from './ProductRead/productRead.jsx';
import ProductCreate from './ProductInteract/productCreate.jsx';
import ProductEdit from './ProductInteract/productEdit.jsx';

import SideMenu from './sideMenu.jsx';
import Login from './Auth/login.jsx';
import Register from './Auth/register.jsx';
import Home from './home.jsx';
import Header from './header.jsx';

const { Content, Footer } = Layout

function App() {
    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <SideMenu />
                <Layout className="site-layout">
                    <Content style={{ margin: "0 16px" }}>
                        <div style={{ marginTop: "35px" }}>
                            <Header />
                            <hr></hr>

                            <Routes>
                                <Route index path="/" element={<Login />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/register" element={<Register />} />

                                <Route path="/device/index" element={<ProductIndex productsType="Device" />} />
                                <Route path="/device/read/:id" element={<ProductRead productType="Device" />} />
                                <Route path="/cloth/index" element={<ProductIndex productsType="Cloth" />} />
                                <Route path="/cloth/read/:id" element={<ProductRead productType="Cloth" />} />

                                <Route path="/product/create" element={<ProductCreate />} />
                                <Route path="/product/edit/:selectedType" element={<ProductEdit />} />
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