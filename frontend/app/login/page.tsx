"use client";
import { Button } from "../components/ui/button";
import { useState } from "react";
import styles from './login.module.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <form action="" className={styles.form} onSubmit={async (e) => {
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
                    <h1 className={styles.title}>Log In</h1>
                    {error && <p className={styles.error}>{error}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        className={styles.submitButton}
                    >
                        {loading ? "Logging in..." : "Submit"}
                    </Button>
                </form>
                <div className={styles.registerPrompt}>
                    <p className={styles.registerText}>New to MarketHub?</p></div>
                <section className={styles.registerSection}>
                    <div className={styles.registerButtonContainer}>
                        <Button
                            variant={"secondary"}
                            onClick={() => {
                                window.location.href = "/register";
                            }}
                            className={styles.registerButton}
                        >
                            Create your MarketHub account
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
}