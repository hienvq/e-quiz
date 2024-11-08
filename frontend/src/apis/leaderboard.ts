import axiosClient from "./base";

const getLeaderboardApi = (quizCode: string) => {
    return axiosClient.get("/leaderboard/", {
        params: {
            quizCode,
        },
    });
};
export { getLeaderboardApi };
