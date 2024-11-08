import { createContext } from "react";

interface AppContextProps {
    registrationData: {
        userCode: string;
        quizCode: string;
    };
    setRegistrationData: (data: { userCode: string; quizCode: string }) => void;
    step: number;
    setStep: (step: number) => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);
