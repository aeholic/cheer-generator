/**
 * CHEER GENERATOR for KARINA (using Open AI)
 * Generates cheer messages for Karina at the Milan Fashion Week SS26.
 * 
 * (c) 2025 @aespaholic1117
 */

"use server";

import "server-only";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

console.log("API key exists?", !!process.env.OPENAI_API_KEY);

export async function generateCheers() {
  const prompt = `
    Write 1 short, fun, and unique cheer message (under 200 characters) 
    for Karina from aespa at Milan Fashion Week SS26.
    Always end with:

    KARINA AT PRADA SS26
    #KARINAxPradaSS26 #KARINA
  `;

try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a fun, energetic Karina fan cheer generator. Keep it short, hype, and positive. Make every cheer sound unique and exciting."
        },
        { 
          role: "user", content: prompt 
        }
      ],
      max_completion_tokens: 70
    });

    const cheers =
      completion.choices[0]?.message?.content?.trim() ??
      "Karina fighting! 🩵\nKARINA AT PRADA SS26\n#KarinaxPradaSS26 #KARINA";

    return cheers;
  } catch (err: any) {
    console.error("OpenAI API Error:", err);

    // handle quota errors
    if (err.status === 429) {
      return "[!] Currently no credits left to generate more cheers.";
    }

    // handle other errors
    return "[!] Something went wrong while generating cheers. Please try again later.";
  }
}
