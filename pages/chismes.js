import styles from '../styles/Chismes.module.css'
import { FaArrowUp, FaArrowDown} from 'react-icons/fa'
export default function Chismes() {
  return (
    <div className={styles.container}>

        <div className={styles.card}>
            <h1>Pepe sigue vivo?</h1>
            <p>Poner descripcion aqui</p> 
            <div className={styles.votacion}>
                <button> <FaArrowUp/></button>
                <button> <FaArrowDown/></button>
            </div>
        </div>

        <div className={styles.card}>
            <h1>Quien trolleo en el D&D?</h1>
            <p>El dungeon master si se cae a pedazos </p> 
            <div className={styles.votacion}>
                <button> <FaArrowUp/></button>
                <button> <FaArrowDown/></button>
            </div>
        </div>

    </div>
  )
}
