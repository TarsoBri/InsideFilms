import { createContext, useContext } from "react";

//LocalStorage
import { useLocalStorage } from "@uidotdev/usehooks";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favsStorage, setFavsStorage] = useLocalStorage("favs_movies", []);
  return (
    <FavoritesContext.Provider value={{ favsStorage, setFavsStorage }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesValue = () => {
  return useContext(FavoritesContext);
};
