import { SizeCheckmark } from "./SizeCheckmark";

export const Sidebar = () => {
  const sizes = ["XS", "S", "M", "L", "ML", "XL", "XXL"];

  return (
    <div className="w-2/3 mx-auto md:w-1/3 md:mx-0 lg: 1/5">
      <h3 className="font-bold text-lg mb-2">Sizes:</h3>
      <form className="flex flex-wrap ">
        {sizes.map((size, index) => (
          <SizeCheckmark size={size} key={index} />
        ))}
      </form>
    </div>
  );
};
