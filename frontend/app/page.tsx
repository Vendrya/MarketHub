"use client";
import Image from "next/image";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import styles from './styles/Landing.module.css';

export default function Home() {
  return (
    <main className={styles.landingContainer + " articleContainer"}>
      <section id={styles.welcomeBanner}>
        <h2>We connect your business with thousands of people</h2>
        <p>Discover a wide range of products and services tailored to your needs. Join us today and take your business to the next level!</p>
      </section>
      <hr />
      <section id={styles.mainCTA}>
        <h3>Expand your business easily</h3>
        <div>
          <Button onClick={() => {window.location.href = "/register"}}>Get Started</Button>
          <Button variant="secondary">Go to dashboard demo</Button>
        </div>
      </section>
      <hr />
      <section id={styles.whyChooseUs}>
        <h2>Why choose our platform?</h2>
        <legend>We created a platform where any seller can publish its products and being contacted directly.</legend>
        <div className={styles.featuresGrid}>
          <Card>
            <h4>Easy to use</h4>
            <p>Our user-friendly interface makes it simple for sellers to list their products and for buyers to find what they need.</p>
          </Card>
          <Card>
            <h4>Manage your store</h4>
            <p>We prioritize the security of our users by implementing robust measures to protect personal and financial information.</p>
          </Card>
          <Card>
            <h4>Wide reach</h4>
            <p>Connect with a vast audience of potential buyers from various regions and demographics.</p>
          </Card>
          <Card>
            <h4>Real-time Chat</h4>
            <p>Connect with a vast audience of potential buyers from various regions and demographics.</p>
          </Card>
          <Card>
            <h4>Product Analytics</h4>
            <p>Connect with a vast audience of potential buyers from various regions and demographics.</p>
          </Card>
          <Card>
            <h4>Easy contact</h4>
            <p>Connect with a vast audience of potential buyers from various regions and demographics.</p>
          </Card>
        </div>
      </section>
      <hr />
      <section id={styles.howItWorks}>
        <h2>How it works?</h2>
        <div className={styles.featuresGrid}>
          <Card>
            <h4>Create your account</h4>
          </Card>
          <Card>
            <h4>Publish products</h4>
          </Card>
          <Card>
            <h4>Start selling!</h4>
          </Card>
        </div>
        <h3>No-Middleman</h3>
        <div className={styles.featuresGrid}>
          <Card>
            <h4>Decide how to pay</h4>
            <p>Set your own payment terms and receive payments directly from customers.</p>
          </Card>
          <Card>
            <h4>Negotiate how to ship</h4>
            <p>Work directly with buyers to agree on shipping arrangements.</p>
          </Card>
          <Card>
            <h4>You own your audience</h4>
            <p>Build direct relationships with your customers without intermediaries.</p>
          </Card>
        </div>
      </section>
      <hr />
      <section id={styles.finalCTA}>
        <h2>Ready to grow your business?</h2>
        <Button onClick={() => {window.location.href = "/register"}}>Get Started</Button>
      </section>
    </main>
  );
}
