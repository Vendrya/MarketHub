"use client";
import { Button } from "../components/ui/button";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="flex items-center justify-center w-full font-sans bg-[--background] text-[--foreground]">
            <main className="flex w-full max-w-3xl flex-col py-32 items-center">
                <form action="" className="flex flex-col w-full max-w-lg border border-gray-300 rounded-2xl p-10 items-center justify-center" onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    setError("");

                    if (!email || !password) {
                        setError("Please fill in all fields.");
                        setLoading(false);
                        return;
                    }

                    try {
                        const res = await fetch("/api/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ email, password }),
                        });
                        const data = await res.json();
                        if (data.error) {
                            setError(data.error);
                        } else {
                            window.location.href = "/";
                        }
                    } catch (err) {
                        setError("An error occurred during login.");
                    }
                    setLoading(false);
                }}>
                    <h1 className="text-4xl font-bold mb-5">Log In</h1>
                    {error && <p className="text-red-500 mb-4 bg-red-200 px-5 w-full text-center py-2 border border-red-400 rounded-sm">{error}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4 p-2 border border-gray-300 rounded w-full"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-4 p-2 border border-gray-300 rounded w-full"
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-5"
                    >
                        {loading ? "Logging in..." : "Submit"}
                    </Button>
                </form>
                <div className=" mt-6 mb-2">
                    <p className="text-gray-500 text-sm">New to MarketHub?</p></div>
                <section className="">
                    <div>
                        <Button
                            variant={"secondary"}
                            onClick={() => {
                                window.location.href = "/register";
                            }}
                            className="rounded-full font-medium"
                        >
                            Create your MarketHub account
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
}
