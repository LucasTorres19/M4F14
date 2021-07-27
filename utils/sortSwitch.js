function sortSwitch(e, videos){

    const selectedIndex = e.target.options.selectedIndex
    const isDesc = e.target.options[selectedIndex].getAttribute('isdesc')
    const prop = e.target.value
    const SortSwitch = {
        string(){
            prop === "publishedAt"?
            videos.sort((a, b) => {
                if(isDesc) return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
                return Date.parse(a.publishedAt) - Date.parse(b.publishedAt);
            }):
            videos.sort((a, b) => {
                var textA = a[prop].toUpperCase();
                var textB = b[prop].toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
        },
        number(){
            videos.sort((a, b) => {
                if(isDesc) return b[prop] - a[prop];
                return a[prop] - b[prop];
            })
        },
    }
    SortSwitch[typeof(videos[0][prop])]()

    
    return videos
}


export default sortSwitch;