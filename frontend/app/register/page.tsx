"use client";
import { Button } from "../components/ui/button";
import { useState } from "react";

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="flex items-center justify-center font-sans bg-[--background] text-[--foreground]">
            <main className="flex w-full max-w-3xl flex-col items-center justify-center py-32">
                <form action="" className="flex flex-col w-full max-w-lg border border-gray-300 rounded-2xl p-10 items-center justify-center" onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    setError("");

                    if (!firstName || !lastName || !email || !password || !confirmPassword) {
                        setError("Please fill in all fields.");
                        setLoading(false);
                        return;
                    }

                    if (password !== confirmPassword) {
                        setError("Passwords do not match.");
                        setLoading(false);
                        return;
                    }

                    try {
                        const res = await fetch("/api/register", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ firstName, lastName, email, password }),
                        });
                        const data = await res.json();
                        if (data.error) {
                            setError(data.error);
                        } else {
                            window.location.href = "/login";
                        }
                    } catch (err) {
                        setError("An error occurred during registration.");
                    }
                    setLoading(false);
                }}>
                    <h1 className="text-4xl font-bold mb-5">Create an account</h1>
                    {error && <p className="text-red-500 mb-4 bg-red-200 px-5 w-full text-center py-2 border border-red-400 rounded-sm">{error}</p>}

                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mb-4 p-2 border border-gray-300 rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mb-4 p-2 border border-gray-300 rounded w-full"
                    />

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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mb-4 p-2 border border-gray-300 rounded w-full"
                    />

                    <p className="text-sm text-gray-600 text-center">By submitting, you agree to MarketHub's {" "}
                        <a href="/conditions-of-use" className="text-blue-500 hover:underline duration-200">Conditions of Use</a> and <a href="/privacy-notice" className="text-blue-500 hover:underline duration-200">Privacy Notice</a>.</p>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-5"
                    >
                        {loading ? "Registering..." : "Submit"}
                    </Button>
                </form>
            </main>
        </div>
    );
}