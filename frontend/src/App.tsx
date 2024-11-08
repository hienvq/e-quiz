import { useState } from "react";
import QuizPage from "./pages/Quiz";
import RegistrationPage from "./pages/Registration";
import { AppContext } from "./AppContext";

function App() {
    const [step, setStep] = useState(1);
    const [registrationData, setRegistrationData] = useState(undefined);
    return (
        <AppContext.Provider value={{ step, setStep, registrationData, setRegistrationData }}>
            {step === 1 ? <RegistrationPage /> : <QuizPage />}
        </AppContext.Provider>
    );
}

export default App;
