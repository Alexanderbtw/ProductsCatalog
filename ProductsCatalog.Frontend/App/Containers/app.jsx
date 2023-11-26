import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import DeviceRead from './DeviceRead/deviceRead.jsx';
import DeviceIndex from './DeviceIndex/deviceIndex.jsx'
import ClothRead from './ClothRead/clothRead.jsx';
import ClothIndex from './ClothIndex/clothIndex.jsx';
import ProductCreate from './ProductCreate/productCreate.jsx';

import { Layout } from 'antd';
import Header from './Header/header.jsx';
const { Content, Footer } = Layout

export default class App extends React.Component {
    render() {
        return(
            <Router>
                <Layout style={{ minHeight: '100vh' }}>
                    <Header />
                    <Layout className="site-layout">
                        <Content style={{ margin: "0 16px" }}>
                            <div style={{ marginTop: "35px" }}>
                                <h2 style={{ marginTop: "30px" }}>{document.title}</h2>
                                <hr></hr>

                                <Routes>
                                    <Route index path="/" element={ <h1>Hello World</h1> } />
                                    <Route path="/device/index" element={<DeviceIndex />} />
                                    <Route path="/device/read/:id" element={<DeviceRead />} />
                                    <Route path="/cloth/index" element={<ClothIndex />} />
                                    <Route path="/cloth/read/:id" element={<ClothRead />} />
                                    <Route path="/product/create" element={<ProductCreate /> } />
                                </Routes>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: "center"}}>
                            @Alexander Goldebaev, 2023
                        </Footer>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}