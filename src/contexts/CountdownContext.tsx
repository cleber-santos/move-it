import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout; // Cancela o timeout - JS puro.

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext)

    const [time, setTime] = useState(0.05 * 60) // transformar min em segundos -> 25 min * 60 segundos = 1500 seg. 
    const [isActive, setIsActive] = useState(false) // Esse estado vai armazenar se o nosso countdown está ativo ou não.
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60) //Math.floor redonda o valor da conta p/ baixo
    const seconds = time % 60 // Vai retornar os restante dos segundos (resto)

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setHasFinished(false)
        setTime(0.05 * 60)
    }

    // useEffect é um hook do react, ou seja é uma função que quando disparada tem um efeito colateral na aplicação
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()
        }
    }, [isActive, time])

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}