import { createContext, ReactNode, useContext, useState } from "react";

type FavoritesContextType = {
  favoritos: number[];
  toggle: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
const [favoritos, setFavoritos] = useState<number[]>([]);

  const toggle = (id: number) => {
    setFavoritos(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favoritos, toggle }}>
      {children}
    </FavoritesContext.Provider>
  );
}


export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites debe usarse dentro del provider');
  return ctx;
};
