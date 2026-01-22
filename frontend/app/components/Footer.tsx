import { Facebook, Instagram, X, Youtube } from 'lucide-react';
import styles from '../styles/Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerGrid}>
                    <div className={styles.footerSection}>
                        <h3>MarketHub</h3>
                        <p>
                            Your destination for premium fashion and lifestyle products.
                        </p>
                        <div className={styles.footerSocial}>
                            <button>
                                <Facebook className="h-5 w-5" />
                            </button>
                            <button>
                                <Instagram className="h-5 w-5" />
                            </button>
                            <button>
                                <X className="h-5 w-5" />
                            </button>
                            <button>
                                <Youtube className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className={styles.footerSection}>
                        <h4>Shop</h4>
                        <ul>
                            <li><a href="#">New Arrivals</a></li>
                            <li><a href="#">Best Sellers</a></li>
                            <li><a href="#">Sale</a></li>
                            <li><a href="#">Gift Cards</a></li>
                        </ul>
                    </div>

                    <div className={styles.footerSection}>
                        <h4>Customer Service</h4>
                        <ul>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Shipping Info</a></li>
                            <li><a href="#">Returns</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>

                    <div className={styles.footerSection}>
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p>&copy; 2025 MarketHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
