import React from 'react';

function Home({ setRoles, roles }) {
    const [username, setUsername] = React.useState(sessionStorage.getItem["USERNAME"]);

    React.useEffect(() => {
        if (!roles) {
            fetch("/Details", {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem("JWT")
                }
            })
                .then(result => result.json())
                .then(result => {
                    sessionStorage.setItem("USERNAME", result.username);
                    sessionStorage.setItem("ROLES", result.roles);
                    setRoles(result.roles);
                    setUsername(result.username);
                })
                .catch(error => {
                    console.log({ error });
                });
        }
        
    }, []);

    return (
        <h1>Hello, {username}</h1>
    );
}

export default Home;