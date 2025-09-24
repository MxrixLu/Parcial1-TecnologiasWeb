'use client'
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { Episode } from "../types/episode";

type FavoritesContextType = {
  favoritos: Episode[];
  toggle: (episode: Episode) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const FAVORITES_KEY = 'rick-morty-favorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<Episode[]>([]);

  // Cargar favoritos desde localStorage al inicializar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const parsedFavorites = JSON.parse(stored) as Episode[];
        setFavoritos(parsedFavorites);
      }
    } catch (error) {
      console.error('Error cargando favoritos desde localStorage:', error);
    }
  }, []);

  // Guardar favoritos en localStorage cada vez que cambien
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritos));
    } catch (error) {
      console.error('Error guardando favoritos en localStorage:', error);
    }
  }, [favoritos]);

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
