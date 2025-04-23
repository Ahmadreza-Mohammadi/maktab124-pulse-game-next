"use client";

import { categories, categoryTranslations } from "../constants/Constants";

function Categories() {


  return (
    <div className="mt-12 bg-gray-950 py-12">
      <h1 className="text-4xl font-extrabold text-center text-white mb-8 animate-fade-in">
        دسته‌بندی محصولات
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 px-4 md:px-8 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={category.name}
            className="relative bg-gray-900 rounded-3xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-slide-up cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Image Section */}
            <div className="relative h-40 w-full overflow-hidden">
              <img
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                src={category.img}
                alt={categoryTranslations[category.name] || category.name}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col items-center gap-2">
              <span
                className="text-lg font-semibold text-white text-center truncate w-full"
                title={categoryTranslations[category.name] || category.name}
              >
                {categoryTranslations[category.name] || category.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;