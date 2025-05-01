"use client";

function ProductsFilterBar() {
  return (
    <div
      className="mt-28 bg-gradient-to-t from-gray-900 to-blue-950 shadow-xl backdrop-blur-sm bg-opacity-90 rounded-lg mx-0 px-8 py-4 flex justify-between items-center w-full"
      dir="rtl"
    >
      <div className="flex items-center gap-4">
        <h1 className="text-white font-medium">مرتب سازی:</h1>
        <select
          className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent cursor-pointer hover:bg-gray-700 transition-colors"
          name="sort"
          id="sort"
        >
          <option value="newest">جدیدترین</option>
          <option value="oldest">قدیمی ترین</option>
          <option value="cheapest">ارزان ترین</option>
          <option value="expensive">گران ترین</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <h1 className="text-white font-medium">دسته بندی:</h1>
        <select
          className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent cursor-pointer hover:bg-gray-700 transition-colors"
          name="category"
          id="category"
        >
          <option value="all">همه</option>
          <option value="keyboard">کیبورد</option>
          <option value="mouse">ماوس</option>
          <option value="headset">هدست</option>
          <option value="chair">صندلی</option>
        </select>
      </div>
    </div>
  );
}

export default ProductsFilterBar;
