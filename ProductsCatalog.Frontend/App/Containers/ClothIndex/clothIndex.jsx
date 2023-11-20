import React from 'react';
import { connect } from 'react-redux';
import { getClothes } from './clothIndexActions.jsx';

class ClothIndex extends React.Component {
    componentDidMount() {
        this.props.getClothes();
    }

    render() {
        let clothesInfo = this.props.clothesInfo;
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
                <h3>Clothes List</h3>
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
                        {clothesInfo.map(cloth => (
                            <tr key={cloth.id}>
                                <td>{cloth.id}</td>
                                <td>{cloth.title}</td>
                                <td>{cloth.price}</td>
                                <td>{cloth.description}</td>
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
        clothesInfo: state.clothIndexReducer.clothesInfo,
        isLoading: state.clothIndexReducer.isLoading,
        error: state.clothIndexReducer.error
    };
};

let mapActionToProps = (dispatch) => {
    return {
        getClothes: () => dispatch(getClothes())
    };
};

export default connect(mapStateToProps, mapActionToProps)(ClothIndex);