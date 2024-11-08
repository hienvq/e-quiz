import { useContext, useEffect, useState } from "react";
import * as socketIO from "socket.io-client";
import { AppContext } from "../AppContext";
import { getLeaderboardApi } from "../apis/leaderboard";
import { getQuestionsApi } from "../apis/question";
import QuestionComponent from "../components/Question";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Leaderboard from "../components/Leaderboard";

const QuizPage: React.FC = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [questionList, setQuestionList] = useState([]);
    const { registrationData } = useContext(AppContext);
    const getLeaderboard = async () => {
        const currentLeaderboard = await getLeaderboardApi(registrationData.quizCode);
        setLeaderboard(currentLeaderboard.data);
    };
    const getQuestions = async () => {
        const questions = await getQuestionsApi(registrationData.quizCode);
        setQuestionList(questions.data);
    };
    useEffect(() => {
        getQuestions();
        getLeaderboard();
        const currentSocket = socketIO.connect(import.meta.env.VITE_API_URL);
        const { quizCode, userCode } = registrationData;
        currentSocket.emit("subscribe", quizCode);
        currentSocket.on("update-leaderboard", (data) => {
            setLeaderboard(data);
        });
        window.addEventListener("beforeunload", () => {
            if (currentSocket) {
                currentSocket.emit("unsubscribe", { quizCode, userCode });
                currentSocket.disconnect();
            }
        });
        return () => {
            if (currentSocket) {
                currentSocket.emit("unsubscribe", { quizCode, userCode });
                currentSocket.disconnect();
            }
        };
    }, []);

    return (
        <Layout>
            <Content className="question_block" style={{ paddingLeft: 5 }}>
                <h1>Questions</h1>
                {questionList.map((e) => (
                    <QuestionComponent key={e._id} id={e._id} content={e.content} options={e.options} />
                ))}
            </Content>
            <Sider theme={"light"} style={{ padding: 5 }}>
                <h1>Name: {registrationData.userCode}</h1>
                <h1>
                    Current Points : {leaderboard.find((e) => e.userCode === registrationData.userCode)?.point ?? 0}
                </h1>
                <Leaderboard leaderboard={leaderboard} />
            </Sider>
        </Layout>
    );
};

export default QuizPage;
