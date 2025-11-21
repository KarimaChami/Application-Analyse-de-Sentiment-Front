"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline"; // Nécessite l'installation de 'npm install @heroicons/react'

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // Début du chargement

    try {
        const response = await axios.post(
        "http://localhost:8000/login",
         {username,password,},
         {headers: { "Content-Type": "application/json" }});

      localStorage.setItem("token", response.data.access_token);
      router.push("/sentiment");
    } catch (err) {
      setError("Nom d'utilisateur ou mot de passe invalide.");
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  };

  return (
    // Conteneur principal: Centré, fond gris clair
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      
      {/* Carte du formulaire: max-w, ombre avancée, coins larges, fond blanc */}
      <div className="w-full max-w-sm bg-white p-8 md:p-10 rounded-xl shadow-2xl transition-all hover:shadow-3xl">
        
        {/* En-tête du formulaire */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Analyse de Sentiment 
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Connectez-vous pour accéder à l'outil.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Champ Nom d'utilisateur */}
          <div>
            <label htmlFor="username" className="sr-only ">
              Nom d'utilisateur
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:ring-2 focus:ring-indigo-800 focus:border-indigo-500 transition duration-150 ease-in-out text-gray-900"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label htmlFor="password" className="sr-only">
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-gray-900"
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Bouton de Connexion */}
          <button
           className={`w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white transition duration-150 ease-in-out 
            ${isLoading 
              ? 'bg-orange-400 cursor-not-allowed' // Couleur plus claire pour l'état de chargement
              : 'bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500' // Couleur principale
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion en cours...
              </>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        {/* Message d'erreur */}
        {error && (
          <div className="mt-6 p-3 rounded-lg bg-red-50 border border-red-300 text-red-700 text-sm font-medium text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;