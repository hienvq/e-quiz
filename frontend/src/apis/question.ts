import axiosClient from "./base";

const submitAnswerApi = (data: { questionId: string; userCode: string; quizCode: string; answer: string }) => {
    return axiosClient.post("/questions/answer", data);
};
const getQuestionsApi = (quizCode: string) => {
    return axiosClient.get("/questions", {
        params: {
            quizCode,
        },
    });
};
export { submitAnswerApi, getQuestionsApi };
