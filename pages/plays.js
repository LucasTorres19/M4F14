import styles from '../styles/Plays.module.css'
import { FaSortAmountDownAlt } from 'react-icons/fa'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import sortSwitch from '../utils/sortSwitch'
import Card from '../components/plays/Card'
import Title from '../components/Title'
import Router from 'next/router'

function Plays (){
    
    const [videos, setVideos] = useState(null)
    const [videoPrincipalId, setVideoPrincipalId] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [keyword, setKeyword] = useState('')
    const videosFiltrados = videos?.filter(video => video.title.toLowerCase().includes(keyword))
    const getData = async () => {
        try{
            const data = await fetch('/api/videosHandler', {method: 'GET'})
            if(data.status === 401) return Router.replace('/login') 
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
    const changeIframeSrc = (e, id) => {
        window.scrollTo(0,0)
        e.preventDefault()
        setVideoPrincipalId(id)
    }
    const addToFavs = (e, id) => {
        window.scrollTo(0,0)
        e.preventDefault()
        setVideoPrincipalId(id)
    }

    const searchVideo = (e)=>{
        setKeyword(e.target.value)
    }
    return (
        
        <main className={styles.main}>
        {isLoading?<Spinner/>:
        <>
        <Title title="Plays"/>
        <iframe width="500px" height="300px" src={`https://www.youtube.com/embed/${videoPrincipalId}?autoplay=0`} frameBorder="0" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        <div className={styles.filtersContainer}>
            <input type="text" placeholder="Buscar..." className={styles.searchVideo} onChange={searchVideo}></input>
            <div className={styles.dropdownContainer}>
                <label htmlFor="select">
                    <FaSortAmountDownAlt />
                </label>
                <select id="select" defaultValue="views" onChange={(e) => {setVideos([...sortSwitch(e, videos)])}}className={styles.dropdownContent}>
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
                
                return(
                    <Card key={item._id} props = {item} functions={{changeIframeSrc, addToFavs}}/>
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