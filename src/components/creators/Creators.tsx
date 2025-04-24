import { creators } from "../constants/Constants";

function Creators() {
  return (
    <div className="mt-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800">سازندگان محبوب</h1>

      {creators.map((creator) => (
        <div className="pt-10">
          <img className="h-24 w-24 rounded-md" src={creator.img} alt="" />
          <span>{creator.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Creators;
