import { useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
    const { minutes, seconds, hasFinished, isActive, startCountdown, resetCountdown} = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')
    // O padStart(2,'0') ele completa um string que não tem 2 (ex 1) para 2 adicionando o '0' a esquerda(start) ex: '1' => '0''1'
    // O .split ele corta a string

    
    // HTML DO COUNTDOWN -----------------------------------------
    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button 
                    disabled
                    className={styles.countdownButton} 
                >
                    Ciclo encerrado
                    <img src="icons/check_circle.svg" alt="check icon"/>
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button 
                            type="button" 
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`} 
                            onClick={resetCountdown} 
                        >
                            Abandonar ciclo
                            <img src="icons/close.svg" alt="close icon"/>
                        </button>
                    ) : (
                        <button 
                            type="button" 
                            className={styles.countdownButton} 
                            onClick={startCountdown} 
                        >
                            Iniciar um ciclo
                            <img src="icons/play_arrow.svg" alt="play icon"/>
                        </button>
                    )}
                </>
            )}

            
           
        </div>
    )
}