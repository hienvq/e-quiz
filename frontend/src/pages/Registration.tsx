import React, { useContext } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { registrationApi } from "../apis/registration";
import { AppContext } from "../AppContext";

type FieldType = {
    userCode: string;
    quizCode: string;
};

const RegistrationPage: React.FC = () => {
    const { setStep, setRegistrationData } = useContext(AppContext);
    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        console.log("Success:", values);
        await registrationApi(values);
        setRegistrationData(values);
        setStep(2);
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className="registration_page">
            <h1>E-Quiz App</h1>
            <Form
                name="registration"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="User Code"
                    name="userCode"
                    rules={[{ required: true, message: "Please input an unique User Code!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Quiz Code"
                    name="quizCode"
                    rules={[{ required: true, message: "Please input the Quiz Code!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Let's go!
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegistrationPage;
