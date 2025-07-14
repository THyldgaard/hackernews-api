import express from 'express';
import storiesRouter from './routes/stories';
import authorRouter from './routes/author';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/stories', storiesRouter);
app.use('/author', authorRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
