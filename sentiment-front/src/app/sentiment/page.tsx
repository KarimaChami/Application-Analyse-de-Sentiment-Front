"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

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
      setError("Vous devez être connecté.");
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
          : "Erreur lors de l'appel API"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-xl">

        <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-700">
          Analyse de Sentiment
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Entrez un texte pour analyser son sentiment.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <textarea
            className="border border-1 text-gray-700 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Saisissez un texte..."
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition"
            disabled={loading}
          >
            {loading ? "Analyse en cours..." : "Analyser"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 mt-4 text-center">{error}</p>
        )}

        {result && (
          <div className="mt-6 text-gray-600 bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">Résultat :</h3>
            <p className="mt-2">Label : <b>{result[0].label}</b></p>
            <p>Score : <b>{result[0].score.toFixed(3)}</b></p>
          </div>
        )}

      </div>
    </div>
  );
}
