"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

// Typage pour la réponse de l'API sentiment
interface SentimentResult {
  label: string;
  score: number;
}

export default function SentimentPage() {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<SentimentResult[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post<SentimentResult[]>(
        "http://localhost:8000/sentiment",
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setResult(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(
        axiosError.response?.data
          ? JSON.stringify(axiosError.response.data)
          : "Error calling sentiment API"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sentiment Analysis</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          className="border p-2 w-full mb-3"
          placeholder="Enter text..."
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {result && (
        <div className="mt-5 border p-4 rounded bg-gray-100">
          <h3 className="font-semibold">Result:</h3>
          <p>Label: {result[0].label}</p>
          <p>Score: {result[0].score.toFixed(3)}</p>
        </div>
      )}
    </div>
  );
}
