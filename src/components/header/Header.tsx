function Header() {
  return (
    <div className="flex flex-col">
      <div className="px-5 py-10 bg-gray-800 flex items-center justify-between shadow-lg">
        {/* Logo Section */}
        <div className="flex gap-4 items-center">
          <img
            className="h-16"
            src="https://www.svgrepo.com/show/408429/user-person-profile-block-account-circle.svg"
            alt="Profile Icon"
          />
          <img
            className="h-16"
            src="https://www.svgrepo.com/show/441364/cart.svg"
            alt="Cart Icon"
          />
        </div>

        {/* Search Section */}
        <div className="flex items-center">
          <input
            className="border outline-none border-gray-500 bg-gray-700 text-white p-2 rounded-r-md focus:outline-none"
            type="text"
            placeholder="جستجو..."
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-l-md hover:bg-blue-600 focus:ring focus:ring-blue-300">
            جستجو
          </button>
        </div>

        {/* Gaming Title Section */}
        <div className="flex items-center gap-4">
          <span className="font-bold text-2xl text-blue-400">پالس گیم</span>
          <img
            className="h-20"
            src="https://www.svgrepo.com/show/283919/game-console.svg"
            alt="Gaming Icon"
          />
        </div>
      </div>
      <div className="bg-red-400">ddd</div>
    </div>
  );
}

export default Header;
