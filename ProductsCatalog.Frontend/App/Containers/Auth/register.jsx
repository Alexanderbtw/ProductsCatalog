import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Divider } from 'antd';

function Register() {
    const navigate = useNavigate();

    React.useEffect(() => {
        document.title = "Products Catalog - Register";
    }, []);

    function handleSubmit(newUser) {
        fetch("https://localhost:7142/api/User/Create", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...newUser,
                roles: ["User"]
            })
        })
            .then(result => {
                if (result.ok) {
                    navigate("/");
                }
            })
            .catch((error) => {
                console.log({ error });
            });
    }

    function onSubmitFailed(error) {
        console.error({ error });
    }

    return (
        <>
            <Divider orientation={"center"}>Registration</Divider>
            <Form
                onFinish={handleSubmit}
                onFinishFailed={onSubmitFailed}
                autoComplete="off"
                requiredMark="optional"
                labelWrap
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
                </Form.Item>
            </Form>
        </>
    );
}

export default Register;