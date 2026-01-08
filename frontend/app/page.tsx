import Image from "next/image";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-[--background] text-[--foreground]">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start pt-20">
        <section className="flex flex-col items-center sm:items-start w-full justify-center">
          <h2 className="sm:text-[35px] text-center text-[25px] font-bold">We connect your business with thousands of people</h2>
          <p className="sm:text-[18px] text-center text-[16px] mt-4 mb-8 text-zinc-700">Discover a wide range of products and services tailored to your needs. Join us today and take your business to the next level!</p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
            <Button className="rounded-xl p-5">Get Started</Button>
            <Button variant="secondary" className="rounded-xl p-5">Browse Products</Button>
          </div>
        </section>
        <section className="mt-16 w-full flex flex-col gap-8 text-center px-5">
          <div className="flex flex-col sm:flex-row gap-8">
            <Card className="flex-1 items-center justify-center">
              <h3 className="text-xl font-semibold">Our Services</h3>
              <p className="text-zinc-700">We offer a wide range of services to help your business grow and succeed in the digital marketplace.</p>
            </Card>
            <Card className="flex-1 items-center justify-center">
              <h3 className="text-xl font-semibold">Our Products</h3>
              <p className="text-zinc-700">Discover our diverse product catalog designed to meet all your business needs and requirements.</p>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
