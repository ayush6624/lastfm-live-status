import express from 'express';
import { getNowPlaying, getRecentTracks } from './music.js';

const app = express();

app.get('/', (req, res) => {
  res.send({ "status": true, "message": "You might want to head over to https://ayushgoyal.dev to see what's cooking!" });
});

app.get('/live', async (req, res) => {
  const resp = await getNowPlaying();
  res.send(resp);
});

app.get("/recent-tracks", async (req, res) => {
  const resp = await getRecentTracks();
  res.send(resp);
})

app.listen(8000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:8000`);
});
