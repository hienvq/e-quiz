import axiosClient from "./base";

const getQuizListApi = () => {
    return axiosClient.get("/quiz/all");
};
export { getQuizListApi };
