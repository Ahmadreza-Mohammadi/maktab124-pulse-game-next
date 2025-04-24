"use client";

import { gameCategories } from "../constants/Constants";

function GameCategories() {
  // Category translations
  const categoryTranslations: { [key: string]: string } = {
    action: "اکشن",
    strategy: "استراتژیک",
    adventure: "ماجراجویی",
    rpg: "نقش آفرینی",
    sport: "ورزشی",
    simulator: "شبیه ساز",
    actionAdventure: "اکشن ماجراجویی",
  };

  return (
    <section
      className="py-12 bg-gradient-to-b from-blue-950 to-blue-800"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-100 mb-8 animate-fade-in">
          دسته‌بندی بازی‌ها
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-center">
          {gameCategories.map((category, index) => (
            <div
              key={category.name}
              className="relative bg-blue-900 rounded-3xl overflow-hidden border border-blue-600/50 hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-slide-up cursor-pointer w-full max-w-44"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Section */}
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110 hover:rotate-3"
                  src={category.img}
                  alt={categoryTranslations[category.name] || category.name}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="p-4 flex flex-col items-center">
                <span
                  className="text-lg font-semibold text-blue-200 text-center truncate w-full transition-colors duration-300 hover:text-blue-400"
                  title={categoryTranslations[category.name] || category.name}
                >
                  {categoryTranslations[category.name] || category.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GameCategories;
