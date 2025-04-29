// import FilteredProducts from "@/components/filtered-products/FilteredProducts";

import FilteredProducts from "@/components/filtered-products/FilteredProducts";

export default function Page({ params }: { params: { category: string } }) {
  return <FilteredProducts gameCategory={params.category} />;
}
