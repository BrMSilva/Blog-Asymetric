import { OpenAI } from "openai";

// Initializes OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Function to generate article using OpenAI
export async function generateArticle() {
  const prompt = `Write a blog article about technology with the following rules:

- Target audience: software developers and tech enthusiasts
- Tone: opinionated, practical, and slightly critical
- Avoid generic introductions like "Technology has become..."
- Start with a concrete problem or real-world example
- Focus on ONE specific topic (AI, backend, startups, privacy, or productivity)
- Use short paragraphs
- End with a practical takeaway or question
`;

// Call OpenAI API
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.6
    });
    
// Extract title, slug, and content
    const text = completion.choices[0].message.content;
    return {
      title: text.split("\n")[0].slice(0, 60).trim() || "Untitled",
      slug: text.split("\n")[0].slice(0, 30).toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.random().toString(36).substring(2, 8),
      content: text
    };
  } catch (err) {
    console.error("Erro ao gerar artigo via OpenAI:", err.message);
    throw err;
  }
}






