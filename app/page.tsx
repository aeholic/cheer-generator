"use client";
import { useState, useTransition } from "react";
import { generateCheers } from "./geminiAI";

export default function Home() {
  const [cheer, setCheer] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    startTransition(async () => {
      const result = await generateCheers();
      setCheer(result);
      setCopied(false);
    });
  }

  function tweetIntent() {
    const encoded = encodeURIComponent(cheer);
    window.open(`https://x.com/intent/post?text=${encoded}`, "_blank");
  }

  async function copyToClipboard() {
    if (!cheer) return;
    await navigator.clipboard.writeText(cheer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="flex min-h-screen bg-[url('/bg.jpg')] bg-cover items-center justify-center bg-gray-50 p-6">
      <div className="max-w-lg w-full space-y-6 p-6 bg-white rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-center">🩵 Karina Cheer Generator 🩵</h1>

        <button
          onClick={handleGenerate}
          disabled={isPending}
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition cursor-pointer"
        >
          {isPending ? "Generating..." : "Click to generate"}
        </button>

        {cheer && (
          <div className="space-y-4">
            <textarea
              className={`w-full h-44 border rounded-xl p-3 resize-none ${
                cheer.startsWith("[!]") || cheer.startsWith("[!]") ? "text-red-600" : ""
              }`}
              rows={3}
              value={cheer}
              onChange={(e) => setCheer(e.target.value)}
            />

            <div className="flex gap-2">
              <button
                onClick={tweetIntent}
                className="flex-1 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition cursor-pointer"
              >
                Post to X
              </button>

              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition cursor-pointer"
              >
                {copied ? "✅ Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
