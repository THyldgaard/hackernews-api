import { Router } from 'express';
import { getStories } from '../services/hackernews-services';

const router = Router();

router.get('/', async (_req, res) => {
  const stories = await getStories();
  res.json(stories);
});

router.get('/refresh', async (_req, res) => {
  const stories = await getStories(true);
  res.json(stories);
});

export default router;
