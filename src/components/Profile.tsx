import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const{ level } = useContext(ChallengesContext)

    return (
        <div className={styles.profileContainer} >
            <img src="https://avatars.githubusercontent.com/u/62780876?s=460&u=cc734903bca901069feeb105f0d76dacbfaae76d&v=4" alt="imagem do perfil"/>
            <div>
                <strong>Cleber Santos</strong>
                <p>
                    <img src="icons/level.svg" alt="Seta para cima"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}