import styles from '../styles/Card.module.css'
import { FaStar} from 'react-icons/fa'
import {useState} from 'react'
import Image from 'next/image'
export default function Header({props, functions}) {
    const { url, height, width, title, videoId} = props
    const {changeIframeSrc, addToFavs} = functions
    const [starColor, setStarColor] = useState('white')
    const clickStar = () => {
        setStarColor((prevColor) => prevColor=='white'?'yellow':'white')
    }
    const clickTitle = (e) =>{
        changeIframeSrc(e, videoId)
    }
    return (
        <li onLoad={() => console.log("se renderizó una lista")} className={styles.card} >
            <Image  width={width} height={height} src={url} alt={title} />
            <FaStar className={styles.cardStar} style={{fill: `${starColor}`}} onClick={clickStar}/>
            <h3 onClick={clickTitle}>{ title }</h3>
        </li> 
    )
}