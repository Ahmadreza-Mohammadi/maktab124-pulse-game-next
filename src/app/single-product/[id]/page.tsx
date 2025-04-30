import SingleProduct from "@/components/single-product/SingleProduct";

export default function Page({ params }: { params: { id: string } }) {
  return <SingleProduct id={params.id} />;
}
;;