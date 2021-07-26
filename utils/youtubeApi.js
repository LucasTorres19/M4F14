const YOUTUBE_API = "https://www.googleapis.com/youtube/v3"
export async function getPopularVideos( lastDate, pageToken = null ){
	lastDate.setMinutes(lastDate.getMinutes() + 1)
	const CHANNEL_ID = "UC3NkyGdVS727tgzmxUajBjg"
	const PARAMS = {
		part: "snippet",
		type: "video",
		order: "viewCount",
		maxResults: 50,
		channelId: CHANNEL_ID,
		key: process.env.YOUTUBE_API_KEY,
		publishedAfter: lastDate.toISOString(),
		pageToken
	}
	const response = await fetch(YOUTUBE_API + "/search" + jsonToQueryString(PARAMS))
    let data = await response.json()
	if (data.nextPageToken){
		const newData = await getPopularVideos(lastDate, data.nextPageToken)
		newData.items = [...data.items, ...newData.items]
		data = newData
	}

	return data
}
export async function getViews( videoIds){

	let array = []
	let views=[]
	for(let i = 0; i<=Math.floor(videoIds.length/50);i++){
		array.push(videoIds.slice(0 + 50*i,50*(i+1)))
	}
	for(const index of array){
		const PARAMS = {
			part: "statistics",
			id: index.join(),
			maxResults: 50,
			key: process.env.YOUTUBE_API_KEY
		}
		const response = await fetch(YOUTUBE_API + "/videos" + jsonToQueryString(PARAMS))
		let data = await response.json()

		data.items.forEach(item=>{
			views.push(item.statistics.viewCount)
		})
	}
	return views
}

function jsonToQueryString(json){
	return "?" + Object.keys(json)
	.filter(key => !!json[key])
	.map(key => `${key}=${json[key]}`)
	.join("&")
}