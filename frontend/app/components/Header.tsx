"use client";
import { Search } from 'lucide-react';
import { Module } from './ui/navigation-button';
import { Button } from './ui/button';
import { useState } from 'react';
import { useProductSearch } from '@/services/hooks/useProductSearch';
import useAuth from './hooks/useAuth';
import styles from '../styles/Header.module.css';

export function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const {
        search: searchBar,
        results: searchBarResults,
        loading: searchBarLoading,
        error: searchBarError,
    } = useProductSearch();
    const { auth } = useAuth();


    // TODO: Implement search functionality by querying the backend API for tagged products
    // TODO: Create context to manage Login state across the app


    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.innerContainer}>

                    <div className={styles.logoNavContainer}>
                        <a href="/" className={styles.logoLink}>
                            <h1 className={styles.logo}>MarketHub</h1>
                        </a>
                        <div >
                            <nav className={styles.navContainer}>
                                <Module href="/explore">
                                    Explore
                                </Module>

                                <Module href="/sell">
                                    Sell
                                </Module>

                                <Module href="/about">
                                    About
                                </Module>
                            </nav>
                        </div>
                    </div>

                    <div className={styles.searchContainer}>
                        <div className={styles.searchBox}>
                            <Search className="h-5 w-5" />
                            <input
                                className={styles.searchInput}
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') { searchBar(searchQuery); } }}
                            />
                        </div>
                    </div>
                    {auth?.user ? (
                        <div className={styles.authContainer}>
                            <span className={styles.greeting}>Hello, {auth.user.firstName}</span>
                            <Button variant={"secondary"} onClick={() => {
                                window.location.href = "/logout"
                            }}>Log Out</Button>
                        </div>
                    ) : (
                        <div className={styles.authContainer}>
                            <Button variant={"primary"} onClick={() => {
                                window.location.href = "/login"
                            }}>Log In</Button>
                            <Button variant={"secondary"} onClick={() => {
                                window.location.href = "/register"
                            }}>Sign Up</Button>
                        </div>
                    )}

                </div>
            </div>
        </header >
    );
}
