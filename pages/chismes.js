import styles from '../styles/Chismes.module.css'
import Title from '../components/Title'
import Card from '../components/chismes/Card'

export default function Chismes() {
    const items = []

    for(let i=0; i<20;i++){
        items.push(
        <Card title="pepe Está vivo?" date="30/7/2021" description="un ejemplo de descripción" ></Card>
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
