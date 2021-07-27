import styles from '../styles/Plays.module.css'
import { FaSortAmountDownAlt, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import sortSwitch from '../utils/sortSwitch'
function Plays (){
    
    const [videos, setVideos] = useState(null)
    const [videoPrincipalId, setVideoPrincipalId] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [keyword, setKeyword] = useState('')
    const videosFiltrados = videos?.filter(video => video.title.toLowerCase().includes(keyword))
    const getData = async () => {
        try{
            const data = await fetch('/api/videosHandler', {method: 'GET'})
            const res = await data.json()
            .then(json=>{
                setVideos(json.data)
                setVideoPrincipalId(json.data[0].videoId)
                setIsLoading(false)
            })
        }catch(e){
            console.error(e)
        }
    } 
    useEffect(()=>{
        getData()
    },[])
    const handleClick = (e, id) => {
        window.scrollTo(0,0)
        e.preventDefault()
        setVideoPrincipalId(id)
    }
    
    const $ = (selector) => document.querySelector(selector)

    const searchVideo = (e)=>{
        setKeyword(e.target.value)
    }
    return (
        
        <main className={styles.main}>
        {isLoading?<Spinner/>:
        <>
        <h1 className={styles.title}>
            Plays
        </h1>
        <iframe width="500px" height="300px" src={`https://www.youtube.com/embed/${videoPrincipalId}?autoplay=0`} frameBorder="0" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        <div className={styles.filtersContainer}>
            <input type="text" placeholder="Buscar..." className={styles.searchVideo} onChange={searchVideo}></input>
            <div className={styles.dropdownContainer}>
                <label htmlFor="select">
                    <FaSortAmountDownAlt />
                </label>
                <select id="select" onChange={(e) => {setVideos([...sortSwitch(e, videos)])}}className={styles.dropdownContent}>
                    <option value='title' isdesc="true">Alfabeticamente</option>
                    <option value='like' isdesc="true">Más gustados</option>
                    <option value='like' >Menos gustados</option>
                    <option value='views' isdesc="true" className={styles.selected}>Más visitas</option>
                    <option value='views' >Menos visitas</option>
                    <option value='publishedAt' >Más antiguos</option>
                    <option value='publishedAt' isdesc="true">Más recientes</option>
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
                {videosFiltrados.map((item) => {
                const { _id, videoId, url, height, width, title } = item
                return(
                    <li key={_id} className={styles.card} style={{}}  onClick={(e) => handleClick(e, videoId)}>

                        <Image onLoad={() => console.log("se renderizó un video")} width={width} height={height} src={url} alt={title}></Image>
                        <h3>{ title }</h3>

                        {/* <div className={styles.rateContainer}>
                        <FaRegThumbsUp/>
                        <FaRegThumbsDown/>
                        </div> */}
                        
                    </li> 
                )
            })}
            </ul>
            }
        </>
        }   
        </main>
    )
}
export default Plays