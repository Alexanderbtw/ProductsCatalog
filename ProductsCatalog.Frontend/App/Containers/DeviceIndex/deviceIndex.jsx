import React from 'react';
import { connect } from 'react-redux';
import { getDevices } from './deviceIndexActions.jsx';

class DeviceIndex extends React.Component {
    componentDidMount() {
        this.props.getDevices();
    }

    render() {
        let devicesInfo = this.props.devicesInfo;
        let isLoading = this.props.isLoading;
        let error = this.props.error;

        if (isLoading) {
            return (
                <div>Loading data...</div>
            );
        }

        if (error) {
            return (
                <div>Error in data loading: {error}</div>
            );
        }

        return (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h3>Devices List</h3>
                <table style={{ width: "80%", marginLeft: "auto", marginRight: "auto", backgroundColor: "lightgray" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devicesInfo.map(device => (
                            <tr key={device.id}>
                                <td>{device.id}</td>
                                <td>{device.title}</td>
                                <td>{device.price}</td>
                                <td>{device.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        devicesInfo: state.deviceIndexReducer.devicesInfo,
        isLoading: state.deviceIndexReducer.isLoading,
        error: state.deviceIndexReducer.error
    };
};

let mapActionToProps = (dispatch) => {
    return {
        getDevices: () => dispatch(getDevices())
    };
};

export default connect(mapStateToProps, mapActionToProps)(DeviceIndex);