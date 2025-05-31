'use client';
import React, { useState } from 'react';
import { Button, Modal, ProductCard, SectionTitle } from '../../../components/ui';
import { db } from '../../../firebase/config';
import { collection, getDocs, query, where, doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../../firebase/auth-context';
import Image from 'next/image';

// Define ProductType and CartItemType
interface ProductType {
  id: string;
  name: string;
  image: string;
  images?: string[];
  price: number;
  oldPrice?: number;
  slug: string;
  description?: string;
  sizes?: string[];
  brand?: string;
}
interface CartItemType {
  id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  href: string;
  size?: string;
}

async function getProduct(slug: string) {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('slug', '==', slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as ProductType;
}

// Add a simple Tabs component for Description/Reviews/Shipping
function Tabs({ tabs, active, onTab }: { tabs: string[]; active: string; onTab: (tab: string) => void }) {
  return (
    <div className="flex gap-4 border-b mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`pb-2 px-2 font-semibold border-b-2 transition text-lg md:text-xl ${active === tab ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-primary'}`}
          onClick={() => onTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const { user } = useAuth();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [activeTab, setActiveTab] = useState('Description');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [related, setRelated] = useState<ProductType[]>([]);

  React.useEffect(() => {
    getProduct(params.slug).then(setProduct);
  }, [params.slug]);

  React.useEffect(() => {
    // Fetch related products (same category or random)
    async function fetchRelated() {
      if (!product) return;
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('slug', '!=', product.slug));
      const snapshot = await getDocs(q);
      setRelated(snapshot.docs.slice(0, 4).map((doc) => ({ id: doc.id, ...doc.data() } as ProductType)));
    }
    fetchRelated();
  }, [product]);

  if (!product) return <div className="text-center py-16">Loading...</div>;

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = async () => {
    if (product.sizes && !selectedSize) return;
    setAdding(true);
    let cart: CartItemType[] = [];
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      const cartSnap = await getDoc(cartRef);
      cart = cartSnap.exists() ? cartSnap.data().items as CartItemType[] : [];
      const exists = cart.find((item) => item.id === product.id && (!product.sizes || item.size === selectedSize));
      if (exists) {
        cart = cart.map((item) => item.id === product.id && (!product.sizes || item.size === selectedSize) ? { ...item, qty: item.qty + 1 } : item);
      } else {
        cart.push({ id: product.id, name: product.name, image: images[0], price: product.price, qty: 1, href: `/product/${product.slug}`, size: selectedSize || undefined });
      }
      await setDoc(cartRef, { items: cart });
    } else {
      cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const exists = cart.find((item: CartItemType) => item.id === product.id && (!product.sizes || item.size === selectedSize));
      if (exists) {
        cart = cart.map((item: CartItemType) => item.id === product.id && (!product.sizes || item.size === selectedSize) ? { ...item, qty: item.qty + 1 } : item);
      } else {
        cart.push({ id: product.id, name: product.name, image: images[0], price: product.price, qty: 1, href: `/product/${product.slug}`, size: selectedSize || undefined });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <main className="max-w-6xl mx-auto px-2 md:px-6 py-8">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Gallery */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative w-full aspect-[3/4] bg-accent rounded-lg overflow-hidden flex items-center justify-center cursor-zoom-in" onClick={() => setZoomOpen(true)}>
            <Image src={images[galleryIdx]} alt={product.name} width={600} height={800} className="object-cover w-full h-full transition-all duration-300" priority />
            <span className="absolute bottom-2 right-2 bg-white/80 text-xs px-2 py-1 rounded shadow">Click to zoom</span>
          </div>
          <div className="flex gap-2 justify-center mt-2">
            {images.map((img, i) => (
              <button key={i} onClick={() => setGalleryIdx(i)} className={`rounded border-2 ${galleryIdx === i ? 'border-primary' : 'border-transparent'} focus:outline-none`}>
                <Image src={img} alt="thumb" width={64} height={64} className="w-16 h-16 object-cover rounded" />
              </button>
            ))}
          </div>
          {/* Zoom Modal */}
          <Modal open={zoomOpen} onOpenChange={setZoomOpen}>
            <div className="flex flex-col items-center">
              <Image src={images[galleryIdx]} alt={product.name} width={800} height={1000} className="object-contain max-h-[80vh]" />
              <div className="flex gap-2 mt-4">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setGalleryIdx(i)} className={`rounded border-2 ${galleryIdx === i ? 'border-primary' : 'border-transparent'} focus:outline-none`}>
                    <Image src={img} alt="thumb" width={48} height={48} className="w-12 h-12 object-cover rounded" />
                  </button>
                ))}
              </div>
            </div>
          </Modal>
        </div>
        {/* Info */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">{product.name}</h1>
            {product.brand && <div className="text-lg text-gray-500 mb-2 font-medium">by {product.brand}</div>}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary text-2xl md:text-3xl font-bold">₹{product.price}</span>
              {product.oldPrice && <span className="text-gray-400 line-through text-lg">₹{product.oldPrice}</span>}
              {product.oldPrice && <span className="bg-secondary text-dark px-2 py-1 rounded text-xs font-semibold ml-2">Save {Math.round(((product.oldPrice-product.price)/product.oldPrice)*100)}%</span>}
            </div>
            {product.sizes && (
              <div className="mb-6">
                <div className="font-semibold mb-2">Select Size:</div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size: string) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'primary' : 'outline'}
                      className={`px-4 py-2 rounded text-sm font-medium ${selectedSize === size ? '' : 'bg-white'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <Button className="w-full md:w-auto mt-2" onClick={handleAddToCart} loading={adding} disabled={added || (product.sizes && !selectedSize)}>
              {added ? 'Added!' : 'Add to Cart'}
            </Button>
          </div>
          {/* Tabs */}
          <div className="mt-6">
            <Tabs tabs={['Description', 'Reviews', 'Shipping']} active={activeTab} onTab={setActiveTab} />
            <div className="min-h-[80px]">
              {activeTab === 'Description' && (
                <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line">{product.description || 'No description available.'}</div>
              )}
              {activeTab === 'Reviews' && (
                <div className="text-gray-700 text-base">No reviews yet.</div>
              )}
              {activeTab === 'Shipping' && (
                <div className="text-gray-700 text-base">Ships in 2-5 business days. Free shipping on orders over ₹999. Easy returns within 7 days.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16">
          <SectionTitle>Related Products</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} name={p.name} image={p.images?.[0] || p.image} price={p.price} oldPrice={p.oldPrice} href={`/product/${p.slug}`} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
} 