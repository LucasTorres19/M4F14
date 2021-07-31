import dbConnect from "../../utils/mongodb";
import {getPopularVideos, updateVideos} from "../../utils/youtubeApi"
import Video from '../../models/Video'
import authenticated from '../../utils/authenticated'
dbConnect();

export default authenticated(async function videosHandler(req, res){
    const { method } = req
    console.log(method)

    switch(method){
        case 'GET':
            try {
                const videos = await Video.find({}).sort({views: -1})
                console.log("hola")
                res.status(200).json({success: true, data: videos})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        case 'POST':
            try{
                //actualiza los videos
                const lastDateVideo = await Video.find({}).limit(1).sort({publishedAt: -1})
                const lastDate = lastDateVideo[0].publishedAt
                let newVideos = await getPopularVideos(lastDate)
                newVideos.items.forEach((video) => {
                    const { id, snippet = {} } = video
                    const { title, publishedAt, thumbnails = {}, resourceId } = snippet
                    const textArea = document.createElement('textarea');
                    textArea.innerHTML = title;
                    const { medium = {} } = thumbnails
                    const {width, height, url} = medium
                    const { videoId } = id
                    Video.create({
                        "title": textArea.value,
                        "publishedAt": publishedAt,
                        "videoId": videoId,
                        "width": width,
                        "height": height,
                        "url": url,
                        "like": 0,
                        "dislike": 0,
                        "views": 0
                    })
                })
                // actualiza las visitas
                const videos = await Video.find({})
                const videosIds = videos.map(video => {
                    return video.videoId
                })
                const updateData = await updateVideos(videosIds)
                for(let i = 0; i<videos.length;i++){
                    videos[i].views = updateData[i].views
                    videos[i].like = updateData[i].like
                    videos[i].dislike = updateData[i].dislike
                    await videos[i].save()
                }
                res.status(200).json({success: true})
            } catch(error){
                res.status(400).json({success: false, data: error})
            }
            break;
            
        default:
            res.status(400).json({success: false})
            break;

    }
})