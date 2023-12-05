import React from 'react';
import { Navigate } from 'react-router-dom';

function Logout({ setRoles }) {
    React.useEffect(() => {
        sessionStorage.clear();
        setRoles(undefined);
    }, [])

    return (
        <Navigate to={"/"} />
    );
}

export default Logout