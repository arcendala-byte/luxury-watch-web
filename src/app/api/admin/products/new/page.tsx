import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="p-4 md:p-10">
      <ProductForm isEdit={false} />
    </div>
  );
}