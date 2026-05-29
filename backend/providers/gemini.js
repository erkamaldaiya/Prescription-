import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const SYSTEM_PROMPT =
  'You are a medical assistant helping doctors write prescriptions. ' +
  'Provide concise, clinically accurate completions. ' +
  'Return ONLY the completion text to append after what the doctor has typed — no preamble, no repetition of existing text, no quotation marks. ' +
  'Keep suggestions under 20 words.';

function buildPrompt(field, text, context) {
  const ctx = [];
  if (context.patientAge) ctx.push(`Patient age: ${context.patientAge}`);
  if (context.patientGender) ctx.push(`Gender: ${context.patientGender}`);
  if (context.diagnosis && field !== 'diagnosis') ctx.push(`Diagnosis: ${context.diagnosis}`);

  const contextStr = ctx.length ? `\nContext: ${ctx.join(', ')}` : '';

  const fieldPrompts = {
    diagnosis: `Complete this clinical diagnosis: "${text}"${contextStr}`,
    medication_name: `Suggest a medication name based on: diagnosis="${context.diagnosis || ''}", typed so far: "${text}"${contextStr}`,
    instructions: `Complete these medication instructions: "${text}"${contextStr}`,
  };

  return fieldPrompts[field] ?? `Complete this medical text: "${text}"${contextStr}`;
}

export async function getGeminiSuggestion(field, text, context) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }

  const prompt = `${SYSTEM_PROMPT}\n\n${buildPrompt(field, text, context)}`;

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { maxOutputTokens: 80, temperature: 0.3 },
  });

  const suggestion = result.response.text().trim();
  return suggestion;
}
