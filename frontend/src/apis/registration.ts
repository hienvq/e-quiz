import axiosClient from "./base";

const registrationApi = (info: { userCode: string; quizCode: string }) => {
    return axiosClient.post("/registration/join", info);
};

export { registrationApi };
