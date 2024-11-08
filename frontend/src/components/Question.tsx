import React, { useContext } from "react";
import { Button, Form, Radio } from "antd";
import { submitAnswerApi } from "../apis/question";
import { AppContext } from "../AppContext";

const QuestionComponent = ({ id, content, options }: { id: string; content: string; options: string[] }) => {
    const {
        registrationData: { userCode, quizCode },
    } = useContext(AppContext);
    const [isCorrect, setIsCorrect] = React.useState(null);
    const [form] = Form.useForm();
    const answer = Form.useWatch("answer", form);
    const onFinish = async (values) => {
        const response = await submitAnswerApi({ answer: values.answer, questionId: id, userCode, quizCode });
        setIsCorrect(response.data.isCorrectAnswer);
    };
    return (
        <Form form={form} name={`question_${id}`} onFinish={onFinish} autoComplete="off">
            <h3>
                {content}{" "}
                {isCorrect !== null && (
                    <span className={isCorrect ? "c_green" : "c_red"}>- {isCorrect ? "Correct" : "Incorrect"}</span>
                )}
            </h3>
            <Form.Item name="answer" rules={[{ required: true, message: "Please choose the answer!" }]}>
                <Radio.Group>
                    {options.map((option) => (
                        <Radio key={option} value={option}>
                            {option}
                        </Radio>
                    ))}
                </Radio.Group>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" type="primary" disabled={isCorrect !== null || !answer}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default QuestionComponent;
