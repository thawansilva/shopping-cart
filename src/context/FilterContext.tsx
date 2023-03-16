import { createContext, ReactNode, useContext, useState } from "react";

type FilterProviderProps = {
  children: ReactNode;
};
type Sizes = string[] | undefined;

type FilterContext = {
  toggleSizeFilter: (size: string) => void;
  sizes: Sizes;
};

const FilterContext = createContext({} as FilterContext);

export const useFilterContext = () => useContext(FilterContext);

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [sizes, setSizes] = useState<Sizes>();

  function toggleSizeFilter(size: string) {
    setSizes((currentSizes: Sizes | undefined) => {
      const sizeFilter = currentSizes?.find((s) => s == size);

      if (sizeFilter) {
        return currentSizes?.filter((s) => s != size);
      }
      return [...(currentSizes || []), size];
    });
  }

  return (
    <FilterContext.Provider value={{ sizes, toggleSizeFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
