import styles from '../styles/Plays.module.css'
import { FaSortAmountDownAlt } from 'react-icons/fa'
import Image from 'next/image'
import { useState } from 'react'




const Plays = ({ videosData }) => {
    const [videos, setVideos] = useState(videosData)
    const [videoPrincipalId, setVideoPrincipalId] = useState(videos[0].videoId)
    const handleClick = (e, id) => {
        window.scrollTo(0,0)
        e.preventDefault()
        setVideoPrincipalId(id)
    }
    const SortSwitch = {
        "alfabeticamente": () => {
            setVideos((previousVideos) => {
                previousVideos.sort((a, b) => {
                    var textA = a.title.toUpperCase();
                    var textB = b.title.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                })
                setVideoPrincipalId(previousVideos[0].videoId)
                return previousVideos;
            })
        },
        "masgustados":() => {
            setVideos((previousVideos) => {
                previousVideos.sort((a, b) => {
                    return b.likes - a.likes;
                })
                setVideoPrincipalId(previousVideos[0].videoId)
                return previousVideos;
            })
        },
        "visitas":() => {
            setVideos((previousVideos) => {
                previousVideos.sort((a, b) => {
                    return b.views - a.views;
                })
                setVideoPrincipalId(previousVideos[0].videoId)
                return previousVideos;
            })
        },
    }

    return (
        <main className={styles.main}>
        <h1 className={styles.title}>
            Plays
        </h1>
        <iframe width="500px" height="300px" src={`https://www.youtube.com/embed/${videoPrincipalId}?autoplay=1`} frameBorder="0" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        <div className={styles.dropdown}>
            <FaSortAmountDownAlt/>
            <span>Ordenar por visitas</span>
            <div className={styles.dropdownContent}>
                <p onClick={() => {SortSwitch['alfabeticamente']()}} className={styles.dropdownOption}>Alfabeticamente</p>
                <p onClick={() => {SortSwitch['masgustados']()}} className={styles.dropdownOption}>Más gustados</p>
                <p onClick={() => {SortSwitch['visitas']()}} className={styles.dropdownOption}>visitas</p>
            </div>
        </div>
        <ul className={styles.grid}>
            {
            
            videos.map((item) => {
                const { _id, videoId, url, height, width, title } = item
                return(
                    <li key={_id} className={styles.card} onClick={(e) => handleClick(e, videoId)}>
                        <a>
                            <Image width={width} height={height} src={url} alt={title}></Image>
                            <h3>{ title }</h3>
                        </a>
                    </li> 
                )
            })
            }
        </ul>
        </main>
    )
}
Plays.getInitialProps = async () =>{

    const res = await fetch(`http://localhost:3000/api/videosHandler`, {method: 'GET'})
    const { data } = await res.json()
    return {videosData: data}
}
export default Plays