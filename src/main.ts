import express from 'express';
import { Response } from './config.js';
const app = express();
import getNowPlaying from './music.js';

app.get('/', (req, res) => {
  res.send({"status": true ,"message":"You might want to head over to https://ayushgoyal.dev to see what's cooking!"});
});

app.get('/live', async (req, res) => {
  const resp: Response | string = await getNowPlaying();
  res.send(resp);
});

app.listen(8000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:8000`);
});
