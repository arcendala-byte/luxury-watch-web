import { notFound } from 'next/navigation';
import ProductDetails from '@/components/ProductDetails';
import { Product } from '@/types/product';

interface Props {
  params: { slug: string };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' });
  if (!res.ok) return notFound();
  const product: Product = await res.json();
  return <ProductDetails product={product as any} />;
}