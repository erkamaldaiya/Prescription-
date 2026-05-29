import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import autocompleteRouter from './routes/autocomplete.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/autocomplete', autocompleteRouter);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Prescription backend running on http://localhost:${PORT}`);
});
