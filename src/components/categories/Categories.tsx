import { categories } from "../constants/Constants";

function Categories() {
    return (
      <div className="flex flex-col items-center gap-6 mt-6 bg-gray-700 py-12">
        <h1 className="text-4xl font-extrabold text-center text-gray-100">
          دسته بندی محصولات
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-4 md:px-8 w-full">
          {categories.map((category) => (
            <div 
              key={category.name} 
              className="shadow-lg rounded-lg p-6 flex flex-col items-center gap-4 cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-gray-800"
            >
              <img 
                className="h-36 w-36 rounded-md transition-transform duration-300 hover:scale-110" 
                src={category.img} 
                alt={category.name} 
              />
              <span className="font-semibold text-xl text-gray-300">
                {category.name === "game" && "بازی"}
                {category.name === "mouse" && "ماوس"}
                {category.name === "keyboard" && "کیبورد"}
                {category.name === "headset" && "هدست"}
                {category.name === "console" && "کنسول"}
                {category.name === "monitor" && "مانیتور"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Categories;
  
