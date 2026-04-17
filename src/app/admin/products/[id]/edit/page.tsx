import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  params: { id: string };
}

// This function simulates fetching your product data
async function getProduct(id: string) {
  // Replace with your actual database call or API fetch
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) return null;
  return res.json();
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) {
    // This triggers the 404 if the ID doesn't exist in your DB
    notFound();
  }

  return (
    <div className="p-4 md:p-10">
      <ProductForm initialData={product} isEdit={true} />
    </div>
  );
}