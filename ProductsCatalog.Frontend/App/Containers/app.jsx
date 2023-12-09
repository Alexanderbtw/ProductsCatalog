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
                                <Route path="/Home" element={<Home />} />
                                <Route path="/Register" element={<Register />} />

                                <Route path="/Device/index" element={<ProductIndex productsType="Device" />} />
                                <Route path="/Device/read/:id" element={<ProductRead productType="Device" />} />
                                <Route path="/Cloth/index" element={<ProductIndex productsType="Cloth" />} />
                                <Route path="/Cloth/read/:id" element={<ProductRead productType="Cloth" />} />
                                <Route path="/Shoe/index" element={<ProductIndex productsType="Shoe" />} />
                                <Route path="/shoe/read/:id" element={<ProductRead productType="Shoe" />} />
                                <Route path="/Furniture/index" element={<ProductIndex productsType="Furniture" />} />
                                <Route path="/Furniture/read/:id" element={<ProductRead productType="Furniture" />} />

                                <Route path="/Product/Create" element={<ProductCreate />} />
                                <Route path="/Product/Edit/:selectedType" element={<ProductEdit />} />
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