import { notFound } from 'next/navigation';
import ProductDetails from '@/components/ProductDetails';
import { Product } from '@/types/product';

interface Props {
  // In Next.js 16, params and searchParams are Promises
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductPage({ params, searchParams }: Props) {
  // 1. Await the params and searchParams
  const { slug } = await params;
  await searchParams; // Awaited to satisfy Next.js 16 requirements

  // 2. Determine the base URL for the fetch
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';

  try {
    // 3. Fetch the product data using the slug
    const res = await fetch(`${baseUrl}/api/products?slug=${encodeURIComponent(slug)}`, { 
      cache: 'no-store' 
    });

    if (!res.ok) {
      return notFound();
    }

    // We type it as any here during the fetch because we know the 
    // component's internal ExtendedProduct interface will handle the validation.
    const productData = await res.json();

    // 4. Render the ProductDetails component
    // No more 'as any' needed here because ProductDetails is now flexible
    return <ProductDetails product={productData} />;
    
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return notFound();
  }
}