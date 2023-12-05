import React from 'react';
import { Form, Input, Button, Divider, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import SessionManager from "./sessionManager.js";
import { PostLogin } from "./accessAPI.js";

function Login() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = React.useState(false);
    const [error, setError] = React.useState([]);

    React.useEffect(() => {
        if (SessionManager.isAuth()) {
            navigate("/home");
        }
    }, [])

    async function handleSubmit(user) {
        setLoading(true);

        const ans = await PostLogin(user)
        if (ans?.token) {
            navigate("/home");
        } else {
            console.log({ ans });
            setError(["Unknown Username or Password"]);
        }
        setLoading(false);
    }

    function onSubmitFailed(error) {
        console.log(error);
    }

    if (isLoading) {
        return (
            <div style={{ textAlign: "center", marginTop: "200px" }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Products Catalog - Login</title>
            </Helmet>

            <Divider orientation={"center"}>Login</Divider>
            <Form
                onFinish={handleSubmit}
                onFinishFailed={onSubmitFailed}
                requiredMark="optional"
                autoComplete="off"
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
                    <Form.ErrorList
                        style={{ color: "red" }}
                        errors={error}
                    />
                </Form.Item>
            </Form>
        </>
    );
}

export default Login;