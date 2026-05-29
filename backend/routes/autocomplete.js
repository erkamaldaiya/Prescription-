import { Router } from 'express';
import { getGeminiSuggestion } from '../providers/gemini.js';
import { getOpenAISuggestion } from '../providers/openai.js';
import { getClaudeSuggestion } from '../providers/claude.js';

const router = Router();

const providerHandlers = {
  gemini: getGeminiSuggestion,
  openai: getOpenAISuggestion,
  claude: getClaudeSuggestion,
};

router.post('/', async (req, res) => {
  const { field, text, context = {}, provider = 'gemini' } = req.body;

  if (!field || text === undefined) {
    return res.status(400).json({ error: 'field and text are required' });
  }

  if (text.trim().length < 3) {
    return res.json({ suggestion: '' });
  }

  const handler = providerHandlers[provider];
  if (!handler) {
    return res.status(400).json({ error: `Unknown provider: ${provider}` });
  }

  try {
    const suggestion = await handler(field, text, context);
    res.json({ suggestion });
  } catch (err) {
    console.error(`[${provider}] autocomplete error:`, err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
