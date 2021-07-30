import {useState, useEffect} from 'react'
function useVideos(){
    const [videos, setVideos] = useState(null)
    const getData = async () => {
        try{
            const data = await fetch('/api/videosHandler', {method: 'GET'})
            if(data.status === 401) return Router.replace('/login') 
            const res = await data.json()
            .then(json=>{
                setVideos(json.data)
            })
        }catch(e){
            console.error(e)
        }
    } 
    useEffect(()=>{
        getData()
    },[])
    return {
        videos,
        setVideos
    }
}
export {useVideos}