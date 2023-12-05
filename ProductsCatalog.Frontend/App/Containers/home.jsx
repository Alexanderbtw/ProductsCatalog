import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import SessionManager from './Auth/sessionManager.js';

function Home() {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!SessionManager.isAuth()) {
            navigate("/");
        }
    }, [])

    const { username } = SessionManager.getUserSession();

    return (
        <>
            <Helmet>
                <title>Products Catalog - Home</title>
            </Helmet>

            <h1 style={{ textAlign:"center" }}>Hello, {username}</h1>
        </>
    );
}

export default Home;