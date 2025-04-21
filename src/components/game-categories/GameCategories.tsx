import { gameCategories } from "../constants/Constants";

function GameCategories() {
  return (
    <section className="px-6 py-10 bg-gray-700 shadow-xl">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-8">
          دسته‌بندی بازی‌ها
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-center">
          {gameCategories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center gap-6 cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gray-800 rounded-lg w-40 h-56 p-6 shadow-md"
            >
              <img
                src={category.img}
                alt={category.name}
                className="object-contain transform group-hover:rotate-3 group-hover:scale-110 transition-all duration-300 rounded-md"
              />
              <span className="text-xl font-semibold text-gray-300 group-hover:text-blue-400 transition-colors duration-300 text-center">
                {category.name === "action" && "اکشن"}
                {category.name === "strategy" && "استراتژیک"}
                {category.name === "adventure" && "ماجراجویی"}
                {category.name === "rpg" && "نقش آفرینی"}
                {category.name === "sport" && "ورزشی"}
                {category.name === "simulator" && "شبیه ساز"}
                {category.name === "actionAdventure" && "اکشن ماجراجویی"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GameCategories;
