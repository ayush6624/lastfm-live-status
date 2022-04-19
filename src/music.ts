import { config, Response } from './config.js';
import fetch from 'node-fetch';

const LASTFM_API_URL = ['https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks', 'format=json', 'limit=1', 'user=' + config.LASTFM_USERNAME, 'api_key=' + process.env.LASTFM_API_KEY].join('&');

const getNowPlaying = async (): Promise<string | Response> => {
    const res = await fetch(LASTFM_API_URL);
    const json = await res.json() as any;
    console.log('track ->', json.recenttracks.track)
    try {
        const [track] = json.recenttracks.track; // grab the first element of the array
        if (!(track['@attr'] && track['@attr'].nowplaying)) return {
            status: false,
            message: "Nothing is playing right now"
        };
        console.log('ims -', track.image)

        const song: Response = {
            status: true,
            song: {
                name: track.name,
                artist: track.artist['#text'],
                img: track.image[3]['#text'],
            }
        };
        return song;
    } catch (err) {
        console.log('#',err);
        return {
            status: false,
            message: `Something went wrong!`,
        };
    }
};

export default getNowPlaying
