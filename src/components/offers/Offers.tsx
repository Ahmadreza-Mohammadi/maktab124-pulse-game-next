import { products } from "@/database/Products";
import { digitsEnToFa } from "@/utils/helper";

function Offers() {
  // Sort products by discount in descending order and slice the first 10
  const topDiscounts = products
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 8);

  return (
    <div className="mt-8 flex flex-col items-center">
      <h1>تخفیف های باورنکردنی پالس گیم</h1>
      <div className="flex flex-wrap gap-10 justify-center">
        {topDiscounts.map((product) => (
          <div className="bg-red-400 p-2 w-[320px] h-64" key={product.title}>
            {product.title} - تخفیف: {digitsEnToFa(product.discount)}٪
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offers;
