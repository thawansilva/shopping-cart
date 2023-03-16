import { useFilterContext } from "../../context/FilterContext";

type sizeProps = {
  size: string;
};

export const SizeCheckmark = ({ size }: sizeProps) => {
  const { toggleSizeFilter } = useFilterContext();

  return (
    <>
      <div className="relative mr-2">
        <input
          tabIndex={2}
          onChange={(e) => {
            if (e.target.checked) toggleSizeFilter(size);
            else toggleSizeFilter(size);
          }}
          type="checkbox"
          value={size}
          name={size}
          title={`size ${size}`}
          className="appearance-none w-10 h-10 bg-gray-200 rounded-full text-xs  hover:outline hover:outline-1 hover:outline-gray-700 checked:bg-yellow-500"
        />
        <label
          htmlFor={size}
          className="inline-block absolute select-none text-xs top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-10"
        >
          {size}
        </label>
      </div>
    </>
  );
};
