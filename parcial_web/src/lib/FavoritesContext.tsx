'use client'
import { createContext, ReactNode, useContext, useState } from "react";
import { Episode } from "../types/episode";

type FavoritesContextType = {
  favoritos: Episode[];
  toggle: (episode: Episode) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<Episode[]>([]);

  const toggle = (episode: Episode) => {
    setFavoritos(prev =>
      prev.find(f => f.id === episode.id)? prev.filter(f => f.id !== episode.id) : [...prev, episode]
    );
  };

  const isFavorite = (id: number) => {
    return favoritos.some(f => f.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favoritos, toggle, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}


export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites debe usarse dentro del provider');
  return ctx;
};
