import styles from '../../styles/components/chismes/Card.module.css'
import { FaArrowUp, FaArrowDown} from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'

export default function Card({title, description, date, Initialvotes = 0}){
    const $buttonUp = useRef(null)
    const $buttonDown = useRef(null)
    const [votes, setVotes] = useState(Initialvotes)

    const handleVotes = (num) => {
        if(Initialvotes + num == votes){
            $buttonDown.current.style.backgroundColor = "white"
            $buttonUp.current.style.backgroundColor = "white"
        }else{
            if(num ==-1){
                $buttonDown.current.style.backgroundColor = "red"
                $buttonUp.current.style.backgroundColor = "white"
            } else{
                $buttonUp.current.style.backgroundColor = "red"
                $buttonDown.current.style.backgroundColor = "white"
            }
        }
        setVotes(Initialvotes + num== votes? Initialvotes:Initialvotes+num) 
    }

    return (
        <div className={styles.card}>
        <h1>{title}</h1>
        <div className={styles.votacion}>
            <button ref={$buttonUp} className={styles.arrow} onClick={()=>{handleVotes(1)}}><FaArrowUp /></button>
            <div className={styles.votes}>{votes}</div>
            <button ref={$buttonDown} className={styles.arrow} onClick={()=>{handleVotes(-1)}}><FaArrowDown/></button>
        </div>
        <textarea value={description} className={styles.description}rows="12" cols="41"disabled></textarea>
        <div className={styles.publishedAt}>{date}</div>
    </div>
    )
}

