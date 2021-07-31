import {useReducer, useEffect} from 'react'
import Router from 'next/router'
function sortVideos({isDesc, prop, videos}){
        const sortedVideos = JSON.parse(JSON.stringify(videos))
        const sortSwitch = {
            string(){
                prop === "publishedAt"?
                sortedVideos.sort((a, b) => {
                    if(isDesc) return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
                    return Date.parse(a.publishedAt) - Date.parse(b.publishedAt);
                }):
                sortedVideos.sort((a, b) => {
                    var textA = a[prop].toUpperCase();
                    var textB = b[prop].toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                })
            },
            number(){
                sortedVideos.sort((a, b) => {
                    if(isDesc) return b[prop] - a[prop];
                    return a[prop] - b[prop];
                })
            },
        }
        sortSwitch[typeof(sortedVideos[0][prop])]()
        return sortedVideos
}
function reducer(state, action){
    const reducerType = {
        loadVideos(action){
            return action.videos
        },
        sortVideos(action){
            const {target: selectedSort} = action.e
            const sortedVideos = sortVideos({
                isDesc: selectedSort.selectedOptions[0].getAttribute('isdesc'),
                prop: selectedSort.value,
                videos: state
            })
            return sortedVideos
        }
    }
    return reducerType[action.type](action)
    
}
function useVideos(){
    const [videos, dispatchVideos] = useReducer(reducer, null)
    const getData = async () => {
        try{
            const data = await fetch('/api/videosHandler', {method: 'GET'})
            if(data.status === 401) return Router.replace('/login') 
            const res = await data.json()
            .then(json=>{
                dispatchVideos({type:'loadVideos', videos:json.data})
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
        dispatchVideos
    }
}
export {useVideos}