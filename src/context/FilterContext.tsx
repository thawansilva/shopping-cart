import { createContext, ReactNode, useContext, useState } from "react";

type FilterProviderProps = {
  children: ReactNode;
};
type Sizes = string[] | undefined;

type FilterContext = {
  toggleFilterSize: (size: string) => void;
  sizes: Sizes;
};

const FilterContext = createContext({} as FilterContext);

export const useFilterContext = () => useContext(FilterContext);

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [sizes, setSizes] = useState<Sizes>();

  function toggleFilterSize(size: string) {
    setSizes((currentSizes: Sizes | undefined) => {
      if (currentSizes?.find((s) => s == size)) {
        return currentSizes.filter((s) => s != size);
      } else {
        return [...(currentSizes || []), size];
      }
    });
  }

  return (
    <FilterContext.Provider value={{ sizes, toggleFilterSize }}>
      {children}
    </FilterContext.Provider>
  );
};
