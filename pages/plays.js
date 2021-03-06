import styles from '../styles/Plays.module.css'
import { FaSortAmountDownAlt } from 'react-icons/fa'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import Card from '../components/plays/Card'
import Title from '../components/Title'
import {useVideos} from '../hooks/useVideos'
function Plays (){
    
    const {videos, dispatchVideos} = useVideos()
    const [videoPrincipalId, setVideoPrincipalId] = useState(null)
    const [keyword, setKeyword] = useState('')
    if(videos && !videoPrincipalId){
        setVideoPrincipalId(videos[0].videoId)

    }
    const videosFiltrados = videos?.filter(video => video.title.toLowerCase().includes(keyword))
    const changeIframeSrc = (e, id) => {
        e.preventDefault()
        window.scrollTo(0,0)
        setVideoPrincipalId(id)
    }
    const addToFavs = (e, id) => {
        e.preventDefault()
    }
    const searchVideo = (e)=>{
        setKeyword(e.target.value)
    }
    const videosMap = ()=>{
        return videosFiltrados.map((item) => {
            return <Card key={item._id} props = {item} functions={{changeIframeSrc, addToFavs}}/>
        })
    }
    return (
        
        <main className={styles.main}>
        {!videos?<Spinner/>:
        <>
        <Title title="Plays"/>
        <iframe width="500px" height="300px" src={`https://www.youtube.com/embed/${videoPrincipalId}?autoplay=0`} frameBorder="0" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        <div className={styles.filtersContainer}>
            <input type="text" placeholder="Buscar..." className={styles.searchVideo} onChange={searchVideo}></input>
            <div className={styles.dropdownContainer}>
                <label htmlFor="select">
                    <FaSortAmountDownAlt />
                </label>
                <select id="select" defaultValue="views" onChange={(e) => {dispatchVideos({type:'sortVideos',e})}}className={styles.dropdownContent}>
                    <option value='title' isdesc="true">Alfabeticamente</option>
                    <option value='like' isdesc="true">M??s gustados</option>
                    <option value='like' >Menos gustados</option>
                    <option value='views' isdesc="true" className={styles.selected}>M??s visitas</option>
                    <option value='views' >Menos visitas</option>
                    <option value='publishedAt' >M??s antiguos</option>
                    <option value='publishedAt' isdesc="true">M??s recientes</option>
                </select>
            </div>
        </div>
        
            {
            videosFiltrados.length===0?
            <>
                <Image src="/notFound.svg" width="250px" height="200px" alt="Not found."></Image>
                <p>No se encontraron resultados.</p>
            </>
            :<ul className={styles.grid}>
                {videosMap()}
            </ul>
            }
        </>
        }   
        </main>
    )
}
export default Plays