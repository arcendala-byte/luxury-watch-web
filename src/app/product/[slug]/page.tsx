import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/ProductDetails';
import { prisma } from '@/lib/prismadb';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Metadata Generation
 * Using direct Prisma calls instead of fetch to avoid 404s on Vercel
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await prisma.product.findUnique({
      where: { slug },
    });

    if (!product) return { title: 'Piece Not Found | Chronos' };

    return {
      title: `${product.name} | Chronos Luxury Collection`,
      description: product.description || `Discover the exquisite craftsmanship of the ${product.name}. A masterpiece of horology.`,
      openGraph: {
        title: product.name,
        description: product.description || '',
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

/**
 * Product Page Component
 * Directly querying Prisma for maximum reliability on production
 */
export default async function ProductPage({ params, searchParams }: Props) {
  // 1. Await the params
  const { slug } = await params;
  await searchParams; 

  try {
    // 2. Fetch data directly from the database
    const productData = await prisma.product.findUnique({
      where: { slug },
    });

    // 3. If no product is found in DB, trigger the 404 UI
    if (!productData) {
      return notFound();
    }

    // 4. Render the ProductDetails component with the retrieved data
    // We convert the product to a plain object to ensure it's serializable
    return <ProductDetails product={JSON.parse(JSON.stringify(productData))} />;
    
  } catch (error) {
    console.error("Database error on product page:", error);
    return notFound();
  }
}