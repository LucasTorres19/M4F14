import styles from '../styles/Chismes.module.css'
import { FaArrowUp, FaArrowDown} from 'react-icons/fa'
import Title from '../components/Title'
export default function Chismes() {
    const items = []

    for(let i=0; i<20;i++){
        items.push(
        <div className={styles.card}>
            <h1>Pepe sigue vivo?</h1>
            <div className={styles.votacion}>
                <button> <FaArrowUp/></button>
                <div className={styles.votes}>0</div>
                <button> <FaArrowDown/></button>
            </div>
            <textarea value="hola" className={styles.description}rows="12" cols="41"disabled></textarea>
            <div className={styles.publishedAt}>28/7/2021</div>
        </div>
        )
    }
  return (
    <main className={styles.main}>
        <Title title="Chismes"/>
        <div className={styles.container}>
            
        {items}
        </div>
    </main>
  )
}
