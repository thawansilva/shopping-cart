import { createContext, ReactNode, useContext, useState } from "react";

type FilterProviderProps = {
  children: ReactNode;
};
type SizesProps = {
  sizes: string[];
};

const FilterContext = createContext({});

export const useFilterContext = () => useContext(FilterContext);

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [sizes, setSizes] = useState<SizesProps[]>([]);

  function toggleFilterSize(size: string) {
    setSizes((currentSizes) => {
      if (currentSizes.find((s) => s == size)) {
        return currentSizes.filter((s) => s != size);
      } else {
        return [...currentSizes, size];
      }
    });
  }

  return (
    <FilterContext.Provider value={{ sizes, toggleFilterSize }}>
      {children}
    </FilterContext.Provider>
  );
};