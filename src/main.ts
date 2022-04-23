import express from 'express';
import { getNowPlaying, getRecentTracks } from './music.js';
import  cors from 'cors';

const app = express();

app.use(express.json())
app.use(cors());
app.options('*', cors());

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
