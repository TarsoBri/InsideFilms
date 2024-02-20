import { useEffect, useState, useReducer } from "react";

import { useFavoritesValue } from "../contexts/FavoritesContext";

export const useFavorites = () => {
  const reducerType = (state, action) => {
    switch (action.type) {
      case "ADD":
        return {
          title: action.title,
          color: "rgba(43, 190, 38, 0.901)",
          content: "foi adicionado nos seus Favoritos!",
        };
      case "REMOVE":
        return {
          title: action.title,
          color: "rgba(207, 0, 0, 0.777)",
          content: "foi removido dos seus Favoritos!",
        };
      default:
        return state;
    }
  };

  const { favsStorage, setFavsStorage } = useFavoritesValue();

  const initialState = { title: "", color: "", content: "" };

  const [active, setActive] = useState(false);

  const [type, setType] = useReducer(reducerType, initialState);

  useEffect(() => {
    let time;
    if (active) {
      time = setTimeout(() => {
        setActive(false);
      }, 3000);
    }
    return () => {
      clearTimeout(time);
    };
  }, [active, type]);

  const [ids, setIds] = useState([]);
  const parseJson = () => favsStorage.map((fav) => JSON.parse(fav));

  useEffect(() => {
    const favs = parseJson();

    return setIds(favs.map((fav) => fav.id));
  }, [favsStorage]);

  const addFavorites = (newFavorite) => {
    setActive(true);

    const favsParseJson = parseJson();

    const repeatedFavs = favsParseJson.some((fav) => fav.id === newFavorite.id);

    let newListJson = [...favsStorage];

    if (!repeatedFavs) {
      setType({
        type: "ADD",
        title: newFavorite.title,
      });
      newListJson.push(JSON.stringify(newFavorite));
    } else {
      setType({
        type: "REMOVE",
        title: newFavorite.title,
      });
      const filterList = favsParseJson.filter(
        (fav) => fav.id != newFavorite.id
      );
      newListJson = filterList.map((fav) => JSON.stringify(fav));
    }

    return setFavsStorage(newListJson);
  };

  return { addFavorites, ids, active, type };
};
