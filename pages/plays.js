import styles from '../styles/Plays.module.css'
import Image from 'next/image'
import { useState } from 'react'
import { getPopularVideos } from '../utils/plays'

export async function getServerSideProps(){
    try{
    const initialData = await getPopularVideos()
    if(initialData.error){
        return {
            props: {
                
            }
        }
    }
    return {
        props: {
            initialData
        }
    }
    }
    catch(err){
        console.log(err)
    }
}

export default function Plays({ initialData = {items: [], nextPageToken:null} } = {initialData:{} }) {
	const [nextPageToken, setNextPageToken] = useState(initialData?.nextPageToken || null)
    const [videos, setVideos] = useState(initialData?.items || [])
    const [videoPrincipalId, setVideoPrincipalId] = useState(initialData?.items[0].id.videoId)
    const nextPage = async (e) => {
        e.preventDefault()
        const consulta = await fetch(`/api/plays?pageToken=${nextPageToken}`)
        const newData = await consulta.json()
        setNextPageToken(newData.nextPageToken)
        setVideos((previousVideos)=> [...previousVideos, ...newData.items])
    }

    const handleClick = (e, id) => {
        window.scrollTo(0,0)
        e.preventDefault()
        setVideoPrincipalId(id)
    }

    return (
        <main className={styles.main}>
        <h1 className={styles.title}>
            Plays
        </h1>
        <iframe width="500px" height="300px" src={`https://www.youtube.com/embed/${videoPrincipalId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        <ul className={styles.grid}>
            {videos.map((item) => {
                const { id, snippet = {} } = item
                const { title, thumbnails = {}, resourceId } = snippet
                const { medium = {} } = thumbnails  
                return(
                    <li key={id.videoId} className={styles.card}>
                        <a onClick={(e) => handleClick(e, id.videoId)}>
                            <Image width={medium.width} height={medium.height} src={medium.url}></Image>
                            <h3>{ title }</h3>
                        </a>
                    </li> 
                )
            })
            }
        </ul>
        {nextPageToken && <button onClick={nextPage}>Mostrar más...</button>}
        </main>
    )
}