import { config, Response, Song } from './config.js';
import fetch from 'node-fetch';

const getUrl = ({ limit = 5 }): string => {
    return `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${config.LASTFM_USERNAME}&api_key=${config.LASTFM_API_KEY}&format=json&limit=${limit}`;
}

const getNowPlaying = async (): Promise<Response> => {
    const res = await fetch(getUrl({ limit: 1 }));
    const json = await res.json() as any;
    try {
        const [track] = json.recenttracks.track; // grab the first element of the array
        if (!(track['@attr'] && track['@attr'].nowplaying)) return {
            status: false,
            message: "Nothing is playing right now"
        };

        const song: Response = {
            status: true,
            data: {
                name: track.name,
                artist: track.artist['#text'],
                img: track.image[3]['#text'],
            }
        };
        return song;
    } catch (err) {
        console.log('#', err);
        return {
            status: false,
            message: `Something went wrong!`,
        };
    }
};

const getRecentTracks = async (): Promise<Response> => {
    const res = await fetch(getUrl({ limit: 5 }));
    const json = await res.json() as any;
    const tracks = json.recenttracks.track;

    const songs: Song[] = tracks.map((track: any) => (
        {
            name: track.name,
            artist: track.artist['#text'],
            img: track.image[3]['#text'],
        }
    ));

    return {
        status: true,
        data: songs,
    }
}

export { getNowPlaying, getRecentTracks, getUrl }
