import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import DeviceRead from './DeviceRead/deviceRead.jsx';
import DeviceIndex from './DeviceIndex/deviceIndex.jsx'
import ClothRead from './ClothRead/clothRead.jsx';
import ClothIndex from './ClothIndex/clothIndex.jsx';

export default class App extends React.Component {
    render() {
        return(
            <Router>
                <div style={{ textAlign: "center", marginTop: "35px" }}>
                    <h2 style={{ marginTop: "30px" }}>Products Catalog</h2>
                    <hr></hr>

                    <div>
                        <Link to={"/device/index"}>All Devices</Link>
                    </div>
                    <div>
                        <Link to={"/device/read/1"}>Single Device</Link>
                    </div>
                    <div>
                        <Link to={"/cloth/index"}>All Clothes</Link>
                    </div>
                    <div>
                        <Link to={"/cloth/read/1"}>Single Cloth</Link>
                    </div>

                    <Routes>
                        <Route path="/device/index" element={<DeviceIndex />} />
                        <Route path="/device/read/:id" element={<DeviceRead />} />
                        <Route path="/cloth/index" element={<ClothIndex />} />
                        <Route path="/cloth/read/:id" element={<ClothRead />} />
                    </Routes>
                </div>
            </Router>
        );
    }
}