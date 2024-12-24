import { Button, Form, Input, Select, Space } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../services/auth";
import { CheckCircleOutlined } from "@ant-design/icons";

const SignUpPage = () => {
    const [signupError, setSignUpError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [finishSignup, setFinishSignup] = useState(false);
    const onSubmit = async (values) => {
        try {
            setIsLoading(true);
            await signup(values);
            setSignUpError("")
            setFinishSignup(true);
        } catch(err) {
            setSignUpError(err.message);
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
    if(finishSignup) {
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-center">
                <p className="font-semibold mb-5 text-3xl">You have successfully created a new account</p>
                <p className="mb-5 text-2xl">
                    Now you can <Link to="/signin" className="text-indigo-600">sign in</Link> to our app
                </p>
                <CheckCircleOutlined style={{fontSize: "40px", color: "green"}} />
            </div>
        )
    }
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <h1 className="font-semibold mb-5 text-3xl">Create a new account</h1>
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
                <Form.Item
                    label="Firstname"
                    name="firstname"
                    rules={[
                        {
                            required: true,
                            message: "Firstname is required.",
                        }
                    ]}
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Surname"
                    name="surname"
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Age"
                    name="age"
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Gender"
                    name="gender"
                >
                    <Select 
                        options={[
                            {
                                value: "male",
                                label: "Male"
                            },
                            {
                                value: "female",
                                label: "Female"
                            }
                        ]}
                    />
                </Form.Item>
                <p className="text-rose-500 text-center mb-2">{signupError}</p>
                <div className="text-center">
                    <Button type="primary" htmlType="submit" className="w-full" loading={isLoading}>
                        Sign up
                    </Button>
                    <div className="mt-2 text-indigo-600">
                        <Space>
                            Already have an account? 
                            <Link to="/signin" className="text-rose-500 font-semibold hover:text-rose-500">
                                Sign in
                            </Link>
                        </Space>
                        
                    </div>
                </div>

                
            </Form>
            
        </div>
    );
}

export default SignUpPage;