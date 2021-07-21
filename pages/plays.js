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
    const nextPage = async (e) => {
        window.scrollTo(0,0)
        e.preventDefault()
        const consulta = await fetch(`/api/plays?pageToken=${nextPageToken}`)
        const newData = await consulta.json()
        setNextPageToken(newData.nextPageToken)
        setVideos((previousVideos)=> [...previousVideos, ...newData.items])
    }
    return (
        <main className={styles.main}>
        <h1 className={styles.title}>
            Plays
        </h1>
        <iframe width="500px" height="300px" src="https://www.youtube.com/embed/TN9CdtIzzO4?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" class="jsx-3953038702"></iframe>
        <ul className={styles.grid}>
            {videos.map((item) => {
                const { id, snippet = {} } = item
                const { title, thumbnails = {}, resourceId } = snippet
                const { medium = {} } = thumbnails  
                return(
                    <li key={id.videoId} className={styles.card}>
                        <a href={`https://www.youtube.com/watch?v=${id?.videoId}`}>
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