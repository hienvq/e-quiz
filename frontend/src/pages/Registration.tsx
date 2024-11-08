import React, { useContext, useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Radio } from "antd";
import { registrationApi } from "../apis/registration";
import { AppContext } from "../AppContext";
import { getQuizListApi } from "../apis/quiz";

type FieldType = {
    userCode: string;
    quizCode: string;
};
const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
        case "quiz_not_found":
            return "Quiz Code not found";
        case "user_already_joined":
            return "User Code is used";
        default:
            return "Something went wrong";
    }
};
const RegistrationPage: React.FC = () => {
    const { setStep, setRegistrationData } = useContext(AppContext);
    const [quizList, setQuizList] = React.useState([]);
    const getQuizList = async () => {
        const questions = await getQuizListApi();
        setQuizList(questions.data);
    };
    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            await registrationApi(values);
            setRegistrationData(values);
            setStep(2);
        } catch (e) {
            const errorMessage = getErrorMessage(e.response.data.message);
            alert(errorMessage);
        }
    };

    useEffect(() => {
        getQuizList();
    }, []);
    return (
        <div className="registration_page">
            <h1>E-Quiz App</h1>
            <Form
                name="registration"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
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
                    <Radio.Group>
                        {quizList.map((quiz) => (
                            <Radio key={quiz._id} value={quiz.code}>
                                {quiz.code}
                            </Radio>
                        ))}
                    </Radio.Group>
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
