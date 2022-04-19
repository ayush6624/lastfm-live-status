const config = {
  LASTFM_USERNAME: 'ayushg1214',
  LASTFM_API_KEY: process.env.LASTFM_API_KEY,
};

type Song = {
  name: string;
  artist: string;
  img: string;
}

type Response = {
  status: boolean,
  message?: string,
  song?: Song
}

export { config };
export type { Song, Response };
