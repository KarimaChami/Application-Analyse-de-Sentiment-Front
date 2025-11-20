"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:8000/login", {
                username,
                password,
            });

            localStorage.setItem("token", response.data.access_token);

            router.push("/sentiment");
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="p-10 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Login</h1>

            <form onSubmit={handleLogin}>
                <input
                    className="border p-2 w-full mb-3"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className="border p-2 w-full mb-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Login
                </button>
            </form>

            {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
    );
}
