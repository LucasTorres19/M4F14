function createSortSwitch(setVideos){
    const SortSwitch = {
        alfabeticamente(e){
            e.preventDefault
            setVideos(
             (previousVideos) => {
                previousVideos.sort((a, b) => {
                    var textA = a.title.toUpperCase();
                    var textB = b.title.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                })
                return [...previousVideos]
                
            }
        )  
        },
        orderByProp(e, prop, param = false){
            e.preventDefault()
            setVideos(
                (previousVideos) => {
                    previousVideos.sort((a, b) => {
                        if(param) return a[prop] - b[prop];
                        return b[prop] - a[prop];
                    })
                    return [...previousVideos]
                }
            )
        },
        fecha(e, param){
            e.preventDefault()
            setVideos(
                (previousVideos) => {
                    previousVideos.sort((a, b) => {
                        if(param) return Date.parse(a.publishedAt) - Date.parse(b.publishedAt);
                        return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
                    })
                    return  [...previousVideos]
                }
            )
            
        },
    }
    return SortSwitch
}


export default createSortSwitch;