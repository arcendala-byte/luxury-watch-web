import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  // Params is a Promise in newer Next.js versions
  params: Promise<{ id: string }>;
}

/**
 * Fetches product data from the internal API.
 * Ensure your .env file has NEXT_PUBLIC_API_URL set (e.g., http://localhost:3000)
 */
async function getProduct(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    
    // Updated path to point to your admin API route
    const res = await fetch(`${baseUrl}/api/admin/products/${id}`, {
      cache: 'no-store', // Ensures we always get the latest data for editing
    });

    if (!res.ok) {
      console.error(`Failed to fetch product ${id}:`, res.statusText);
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  // Await the params to get the ID
  const { id } = await params;
  
  const product = await getProduct(id);

  if (!product) {
    // Triggers the 'Lost in Time' 404 page if ID is invalid or not found
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-10">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-2">
          Administration / Editor
        </p>
        <div className="h-px w-20 bg-[#D4AF37]/30" />
      </div>

      <ProductForm initialData={product} isEdit={true} />
    </div>
  );
}