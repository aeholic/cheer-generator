/**
 * CHEER GENERATOR for KARINA (using Gemini API)
 * Generates cheer messages for Karina at the Milan Fashion Week SS26.
 * 
 * (c) 2025 @aespaholic1117
 */

"use server";

import "server-only";
import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

console.log("API key exists?", !!process.env.GEMINI_API_KEY);

export async function generateCheers() {
  const prompt = `
    Write 1 short, fun, and unique cheer message (up to 200 characters) 
    for Karina who's a K-pop artist and is attending the Milan Fashion Week SS26.
    Don't include any hashtags. Be more playful and creative. Don't always use the same words.
  `;

try {
    const model = client.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent(prompt);
    const cheer = result.response.text().trim();

    return `${cheer || "🩵 Karina fighting!"}\n\rKARINA AT PRADA SS26\n#KARINAxPradaSS26 #KARINA`;
  } catch (err) {
    console.error("Gemini API Error:", err);
    return "[!] Could not generate cheer (maybe quota exceeded).";
  }
}
