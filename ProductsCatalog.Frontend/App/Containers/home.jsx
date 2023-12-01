import React from 'react';

function Home() {
    React.useEffect(() => {
        document.title = "Products Catalog - Home";
    }, []);

    return (
        <h1>Hello from Home</h1>
    );
}

export default Home;