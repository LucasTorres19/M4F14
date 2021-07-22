const YOUTUBE_API = "https://www.googleapis.com/youtube/v3"
export async function getPopularVideos( pageToken = null ){
	const CHANNEL_ID = "UC3NkyGdVS727tgzmxUajBjg"
	const PARAMS = {
		part: "snippet",
		type: "video",
		order: "viewCount",
		maxResults: 50,
		channelId: CHANNEL_ID,
		key: process.env.YOUTUBE_API_KEY,
		pageToken
	}
	const response = await fetch(YOUTUBE_API + "/search" + jsonToQueryString(PARAMS))
    const data = await response.json()

	return data
}

function jsonToQueryString(json){
	return "?" + Object.keys(json)
	.filter(key => !!json[key])
	.map(key => `${key}=${json[key]}`)
	.join("&")
}