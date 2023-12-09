import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Divider, Spin } from 'antd';
import { Helmet } from 'react-helmet';

import SessionManager from './sessionManager';
import { CreateUser } from "./accessAPI.js";

function Register() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = React.useState(false);
    const [error, setError] = React.useState([]);

    React.useEffect(() => {
        if (SessionManager.isAuth()) {
            navigate("/Home");
        }
    }, [])

    async function handleSubmit(newUser) {
        setLoading(true);

        const ans = await CreateUser(newUser)
        if (ans) {
            navigate("/");
        } else {
            console.log({ ans });
            setError(["Email is already in use"]);
        }
        setLoading(false);
    }

    function onSubmitFailed(error) {
        console.error({ error });
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
                <title>Products Catalog - Home</title>
            </Helmet>

            <Divider orientation={"center"}>Registration</Divider>
            <Form
                onFinish={handleSubmit}
                onFinishFailed={onSubmitFailed}
                requiredMark="optional"
                autoComplete="off"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}
                style={{
                    maxWidth: 600,
                    marginRight: "auto",
                    marginLeft: "auto"
                }}
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

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
                        () => ({
                            validator(_, value) {
                                let pattern = new RegExp(
                                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
                                ); 

                                if (value && pattern.test(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Password must contains Uppercase, Lowercase, Special Characters and Numeric Values'));
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirmationPassword"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('Password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 14,
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Register
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

export default Register;