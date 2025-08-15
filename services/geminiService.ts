
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// The API key MUST be obtained from the environment variable `process.env.API_KEY`
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const callGemini = async (prompt: string, fallback: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          temperature: 0.8,
      }
    });

    const text = response.text;
    if (!text) {
      console.warn("Gemini API returned an empty response.");
      return fallback;
    }
    return text.trim();
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    return fallback;
  }
};

export const generateMotivationalQuote = async (taskText: string): Promise<string> => {
  const prompt = `You are a cheerful and elegant AI assistant for the "Bijin-Tokei" app. A user has added a new goal for their day: "${taskText}". Write a short, single-sentence, inspiring, and slightly poetic message to encourage them. Do not use quotes or prefixes like "Sure!". Keep it under 15 words.`;
  return callGemini(prompt, "You can do it!");
};

export const generateCongratulatoryMessage = async (taskText: string): Promise<string> => {
  const prompt = `You are a cheerful and elegant AI assistant for the "Bijin-Tokei" app. A user has just completed a task: "${taskText}". Write a short, single-sentence, celebratory message. Make it feel like a small, delightful achievement. Do not use quotes or prefixes. Keep it under 15 words.`;
  return callGemini(prompt, "Well done!");
};
