function SingleProduct() {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gray-800 rounded-3xl overflow-hidden border border-gray-700/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src="/placeholder.jpg"
                alt="Product Image"
              />
              {/* Category Label */}
              <span className="absolute top-4 right-4 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
                دسته‌بندی
              </span>
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-6">
              <h1 className="text-3xl font-bold text-white">نام محصول</h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="text-white mr-2">۴.۵</span>
                </div>
                <span className="px-4 py-1 rounded-full text-sm font-semibold bg-green-500/20 text-green-400">
                  موجود
                </span>
              </div>

              <div className="bg-gray-700/50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-white mb-4">
                  توضیحات محصول
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  توضیحات کامل محصول در این قسمت قرار می‌گیرد. این متن نمونه است
                  و می‌تواند با توضیحات واقعی محصول جایگزین شود.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-4 rounded-xl">
                  <p className="text-gray-400 mb-2">قیمت</p>
                  <p className="text-2xl font-bold text-white">
                    ۲,۵۰۰,۰۰۰ تومان
                  </p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-xl">
                  <p className="text-gray-400 mb-2">تخفیف</p>
                  <p className="text-2xl font-bold text-white">۲۰٪</p>
                </div>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-xl">
                <p className="text-gray-400 mb-2">پلتفرم</p>
                <p className="text-white">PC, PlayStation 5, Xbox Series X</p>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-xl">
                <p className="text-gray-400 mb-2">سازنده</p>
                <p className="text-white">نام سازنده</p>
              </div>

              <button className="mt-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
