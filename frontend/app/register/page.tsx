"use client";
import { Button } from "../components/ui/button";
import { useState } from "react";
import styles from './register.module.css';

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <form action="" className={styles.form} onSubmit={async (e) => {
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
                    <h1 className={styles.title}>Create an account</h1>
                    {error && <p className={styles.error}>{error}</p>}

                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={styles.input}
                    />

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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={styles.input}
                    />

                    <p className={styles.terms}>By submitting, you agree to MarketHub's {" "}
                        <a href="/conditions-of-use">Conditions of Use</a> and <a href="/privacy-notice">Privacy Notice</a>.</p>
                    <Button
                        type="submit"
                        disabled={loading}
                        className={styles.submitButton}
                    >
                        {loading ? "Registering..." : "Submit"}
                    </Button>
                </form>
            </main>
        </div>
    );
}