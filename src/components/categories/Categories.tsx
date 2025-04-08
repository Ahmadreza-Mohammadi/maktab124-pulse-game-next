function Categories() {
  const gameCategories = [
    {
      name: "action",
      img: "https://bazishopiran.ir/wp-content/uploads/icongame-53-100x100.png",
    },
    {
      name: "actionAdventure",
      img: "https://bazishopiran.ir/wp-content/uploads/icongame-45-100x100.png",
    },
    {
      name: "adventure",
      img: "https://bazishopiran.ir/wp-content/uploads/icongame-48-100x100.png",
    },
    {
      name: "rpg",
      img: "https://bazishopiran.ir/wp-content/uploads/icongame-49-100x100.png",
    },
    {
      name: "strategy",
      img: "https://bazishopiran.ir/wp-content/uploads/icongame-10-100x100.png",
    },
    {
      name: "sport",
      img: "https://bazishopiran.ir/wp-content/uploads/icongame-32-100x100.png",
    },
    {
      name: "simulator",
      img: "https://bazishopiran.ir/wp-content/uploads/icongame-33-100x100.png",
    },
  ];

  return (
    <section className="px-6 py-10 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 animate-fade-in">
          دسته‌بندی بازی‌ها
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-center">
          {gameCategories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center gap-4 cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white rounded-lg w-40 h-56 p-6"
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-20 h-20 object-contain transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300"
              />
              <span className="text-xl font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300 text-center">
                {(category.name === "action" && "اکشن") ||
                  (category.name === "strategy" && "استراتژیک") ||
                  (category.name === "adventure" && "ماجراجویی") ||
                  (category.name === "rpg" && "نقش آفرینی") ||
                  (category.name === "sport" && "ورزشی") ||
                  (category.name === "simulator" && "شبیه ساز") ||
                  (category.name === "actionAdventure" && "اکشن ماجراجویی")}
              </span>
              <div className="w-0 h-1 bg-blue-600 group-hover:w-full transition-all duration-500 ease-in-out rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;