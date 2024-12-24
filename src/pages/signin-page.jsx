import { Button, Form, Input, Space } from "antd";
import { login } from "../services/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const onSubmit = async (values) => {
        try {
            setIsLoading(true);
            await login(values);
            setLoginError("");
            navigate(0);
        } catch(err) {
            setLoginError(err.message);
        } finally {
            setIsLoading(false);
        }
    }
    const formLayout = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 20,
        },
    }
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <h1 className="font-semibold mb-5 text-3xl">Sign in</h1>
            <Form 
                onFinish={onSubmit}
                {...formLayout}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Username is required."
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Password is required.",
                        }
                    ]}
                    >
                    <Input.Password />
                </Form.Item>
                <p className="text-rose-500 text-center mb-2">{loginError}</p>
                <div className="text-center">
                    <Button type="primary" htmlType="submit" className="w-full" loading={isLoading}>
                        Login
                    </Button>
                    <div className="mt-2 text-indigo-600">
                        <Space>
                            Don't have an account? 
                            <Link to="/signup" className="text-rose-500 font-semibold hover:text-rose-500">
                                Sign up
                            </Link>
                        </Space>
                        
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default SignInPage;