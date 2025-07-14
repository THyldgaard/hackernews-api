import { Router } from 'express';
import { getAuthor } from '../services/hackernews-services';

const router = Router();

router.get('/:id', async (req, res) => {
  const author = await getAuthor(req.params.id);
  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }
  res.json(author);
});

export default router;
