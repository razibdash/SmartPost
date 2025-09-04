const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function generatePost({ topic, platform, tone, audience }) {
  const prompt = `Write a ${platform} post about "${topic}" in a ${tone} tone for ${audience}. Keep it concise. Add relevant hashtags and 1-2 emojis.`;

  const resp = await groq.chat.completions.create({
    model: 'llama3-70b-8192', // or 'mixtral-8x7b-32768'
    temperature: 0.7,
    messages: [
      { role: 'system', content: 'You are a helpful social media copywriter.' },
      { role: 'user', content: prompt }
    ],
  });

  return resp.choices?.[0]?.message?.content?.trim() || '';
}

module.exports = { generatePost };
