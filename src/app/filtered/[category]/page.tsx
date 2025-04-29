import FilteredProducts from "@/components/filtered-products/FilteredProducts";

export default function Page({ params }: { params: { category: string } }) {
  return <FilteredProducts value={params.category} />;
}
