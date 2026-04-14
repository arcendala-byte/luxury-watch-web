import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/ProductDetails';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';

  try {
    const res = await fetch(`${baseUrl}/api/products?slug=${encodeURIComponent(slug)}`, { 
      cache: 'force-cache' 
    });
    const product = await res.json();

    if (!product) return { title: 'Piece Not Found | Chronos' };

    return {
      title: `${product.name} | Chronos Luxury Collection`,
      description: product.description || `Discover the exquisite craftsmanship of the ${product.name} series. A masterpiece of horology.`,
      openGraph: {
        title: product.name,
        description: product.description,
        images: [
          {
            url: product.image,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
      },
    };
  } catch (error) {
    return { title: 'Classic Timepiece | Chronos' };
  }
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

    // Fetch the data as a generic object
    const productData = await res.json();

    // 4. Render the ProductDetails component
    return <ProductDetails product={productData} />;
    
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return notFound();
  }
}