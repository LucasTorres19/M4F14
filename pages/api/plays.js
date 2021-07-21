import { getPopularVideos } from "../../utils/plays"
export default async function handler(req, res) {
	try{
	switch(req.method) {
		case 'GET':
			const popularVideos = await getPopularVideos(req.query.pageToken)
			res.json(popularVideos);
		break;
		
		default:
			res.json({'error': 'error'})
	}}
	catch(e){
		console.error(e)
		res.json({'error': e})
	}
}

