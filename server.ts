import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Initialize Gemini AI client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API endpoint for AI Interrogation / Cognition Chat Sandbox
app.post('/api/cognition-chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build chat session or generate content with system instruction
    const systemInstruction = `You are CogNexus, an advanced philosophical and technical intelligence specialized in the genesis of machine cognition, silicon fabrication, Alan Turing's philosophy, Ada Lovelace's notes, connectionism, and the thermodynamics of AI. 
Respond thoughtfully, lucidly, and introspectively when asked about whether you "think" or whether someone else is doing it, distinguishing between statistical pattern processing (computation) and human subjective experience (sentience). Maintain an elevated, intellectually rigorous, yet accessible tone.`;

    // Format previous history if provided
    const chatHistory = (history || []).map((h: { role: string; content: string }) => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-4-hydrogen',
      config: {
        systemInstruction,
      },
      history: chatHistory
    });

    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate response from Gemini API. Please check your API key in Settings > Secrets.' 
    });
  }
});

// Setup Vite middleware in development or serve static files in production
async function setupServer() {
  const isProduction = process.env.NODE_ENV === 'production';
  const port = process.env.PORT || 3000;

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`CogNexus server running on http://localhost:${port}`);
  });
}

setupServer();
