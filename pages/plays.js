import styles from '../styles/Plays.module.css'
import { FaSortAmountDownAlt, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import createSortSwitch from '../utils/createSortSwitch'
import Spinner from '../components/Spinner'

function Plays (){
    
    const [videos, setVideos] = useState(null)
    const [videoPrincipalId, setVideoPrincipalId] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
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
            console.log(e)
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
    const SortSwitch = createSortSwitch(setVideos)
    
    const $ = (selector) => document.querySelector(selector)

    const searchVideo = ()=>{
        const $inp = $('#searchVideo')
        const query = $inp.value
        setVideos((previousVideos) => {
            const newVideos = previousVideos.map((video) => {
                if(video.title.toLowerCase().includes(query)){ 
                    video.display= "block"
                    return video
                }
                video.display = "none"
                return video
            })
            return [...newVideos]
        })
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
            <input type="text" placeholder="Buscar..." className={styles.searchVideo} id="searchVideo" onChange={searchVideo}></input>
            <div className={styles.dropdown}>
                <FaSortAmountDownAlt/>
                <span>Ordenar por ...</span>
                <div className={styles.dropdownContent}>
                    <p onClick={SortSwitch['alfabeticamente']} className={styles.dropdownOption}>Alfabeticamente</p>
                    <p onClick={(e)=>SortSwitch['orderByProp'](e,"likes","asc")} className={styles.dropdownOption}>Más gustados</p>
                    <p onClick={(e)=>SortSwitch['orderByProp'](e,"likes")} className={styles.dropdownOption}>Menos gustados</p>
                    <p onClick={(e)=>SortSwitch['orderByProp'](e,"views")} className={styles.dropdownOption}>Más visitas</p>
                    <p onClick={(e)=>SortSwitch['orderByProp'](e,"views", "asc")} className={styles.dropdownOption}>Menos visitas</p>
                    <p onClick={(e)=>SortSwitch['fecha'](e,"asc")} className={styles.dropdownOption}>Más antiguos</p>
                    <p onClick={SortSwitch['fecha']} className={styles.dropdownOption}>Más recientes</p>
                </div>
            </div>
        </div>
        <ul className={styles.grid}>
            {
            
            videos.map((item) => {
                if(!item)return
                const { _id, videoId, url, height, width, title } = item
                return(
                    <li key={_id} className={styles.card} style={item.display?{display: item.display}:{display: "block"}} onLoad={() => console.log("se renderizó un video")} onClick={(e) => handleClick(e, videoId)}>

                        <Image width={width} height={height} src={url} alt={title}></Image>
                        <h3>{ title }</h3>

                        {/* <div className={styles.rateContainer}>
                        <FaRegThumbsUp/>
                        <FaRegThumbsDown/>
                        </div> */}
                        
                    </li> 
                )
            })
            }
        </ul>
        </>
        }   
        </main>
    )
}
export default Plays