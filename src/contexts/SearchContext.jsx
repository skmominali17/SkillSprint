import { createContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  const searched = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  return (
    <SearchContext.Provider value={{ search, searched }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
