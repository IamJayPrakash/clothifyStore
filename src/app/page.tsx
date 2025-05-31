import Image from "next/image";
import Link from "next/link";
import { Card, Button, Input, SectionTitle } from '../components/ui';

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Hero Banner */}
      <section className="relative w-full h-[400px] flex items-center justify-center bg-gradient-to-r from-pink-100 via-pink-200 to-pink-50">
        <div className="text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary drop-shadow">Discover Ethnic Elegance</h1>
          <p className="text-lg md:text-2xl mb-6 text-gray-700">Shop Sarees, Suits, Kurtis & More</p>
          <Link href="/shop">
            <Button size="lg" className="rounded-full px-8 py-3 text-lg font-semibold shadow">Shop Now</Button>
          </Link>
        </div>
        <Image src="/hero-banner.jpg" alt="Hero Banner" fill className="object-cover opacity-30 absolute inset-0 z-0" />
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto py-12">
        <SectionTitle>Featured Categories</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Sarees", img: "/cat-saree.jpg", href: "/shop?category=saree" },
            { name: "Suits", img: "/cat-suit.jpg", href: "/shop?category=suit" },
            { name: "Kurtis", img: "/cat-kurti.jpg", href: "/shop?category=kurti" },
            { name: "Co-ords", img: "/cat-coord.jpg", href: "/shop?category=coord" },
          ].map((cat) => (
            <Card key={cat.name} className="group block p-0 overflow-hidden hover:shadow-xl transition">
              <Link href={cat.href} className="block">
                <div className="relative w-full h-40">
                  <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4 text-center font-semibold text-lg group-hover:text-primary">{cat.name}</div>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="container mx-auto py-12">
        <SectionTitle>Trending Now</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="flex flex-col items-center p-4">
              <div className="relative w-40 h-56 mb-4">
                <Image src={`/trending${i}.jpg`} alt={`Trending Product ${i}`} fill className="object-cover rounded" />
              </div>
              <div className="font-bold mb-1">Product Name {i}</div>
              <div className="text-primary font-bold mb-2">₹1,999</div>
              <Button variant="outline" size="sm" className="w-full mt-2">Quick View</Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-pink-50 py-12">
        <div className="container mx-auto flex flex-col items-center">
          <SectionTitle>Subscribe to our Newsletter</SectionTitle>
          <p className="mb-6 text-gray-600 text-center">Be the first to know about new launches, offers & more.</p>
          <form className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Input type="email" placeholder="Your email" className="flex-1" required />
            <Button type="submit" className="px-6 py-2 font-semibold">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
