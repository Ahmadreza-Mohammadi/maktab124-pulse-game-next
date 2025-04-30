import FilteredProducts from "@/components/filtered-products/FilteredProducts";

export default function Page({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { key?: string };
}) {
  // Get the filter key from URL params, default to 'category' if not provided
  const filterKey = searchParams.key || "category";

  return (
    <FilteredProducts
      key={params.category}
      value={params.category}
      filterKey={filterKey}
    />
  );
}
