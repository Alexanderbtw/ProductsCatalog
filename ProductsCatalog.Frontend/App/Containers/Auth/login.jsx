import React from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    fetch("/IsAuth", {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem("JWT")
        },
    })
        .then(result => {
            if (result.ok) {
                navigate("/home");
            }
        })
        .catch(error => {
            console.log({ error })
        });

    React.useEffect(() => {
        document.title = "Products Catalog - Login";
    }, []);

    function handleSubmit(user) {
        fetch("https://localhost:7142/api/Auth/Login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(result => result.json())
            .then((result) => {
                sessionStorage.setItem("JWT", result.token);
                navigate("/home");
            })
            .catch((error) => {
                console.log({ error });
            });
    }

    function onSubmitFailed(error) {
        console.log(error);
    }

    return (
        <>
            <Divider orientation={"center"}>Login</Divider>
            <Form
                onFinish={handleSubmit}
                onFinishFailed={onSubmitFailed}
                autoComplete="off"
                requiredMark="optional"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                    marginRight: "auto",
                    marginLeft: "auto"
                }}
            >
                <Form.Item
                    name="UserName"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="Password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default Login;