import styles from '../styles/Plays.module.css'

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3/playlistItems"
const LIST_UPLOADED_VIDEOS_ID = "UU3NkyGdVS727tgzmxUajBjg"
export async function getServerSideProps(){
    const res = await fetch(`${YOUTUBE_API}?part=snippet&playlistId=${LIST_UPLOADED_VIDEOS_ID}&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`)
    const data = await res.json()
    return {
        props: {
            data
        }
    }
}

export default function Plays({ data }) {
    console.log('data', data)
    return (
        <main className={styles.main}>
        <h1 className={styles.title}>
            Plays
        </h1>
        <ul className={styles.grid}>
            {data.items.map((item) => {
                const { id, snippet = {} } = item
                const { title, thumbnails = {}, resourceId } = snippet
                const { medium = {} } = thumbnails  
                return(
                    <li key={id} className={styles.card}>
                        <a href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}>
                        <p>
                            <img width={medium.width} height={medium.height} src={medium.url}></img>
                        </p>
                        
                            <h3>{ title }</h3>
                        </a>
                    </li>
                )
            })}
            
        </ul>
        </main>
    )
}