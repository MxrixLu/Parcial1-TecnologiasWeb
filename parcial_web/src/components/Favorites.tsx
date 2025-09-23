'use client'

import { Episode } from '../types/episode';
import { useFavorites } from '../lib/FavoritesContext';
import EpisodeCard from './EpisodeCard';

export default function Favorites() {
  const { favoritos } = useFavorites();

  if (favoritos.length === 0) {
    return (
      <div className="p-4">
        <h2 className="font-bold mb-4">Favoritos</h2>
        <p className="text-gray-600">No tienes episodios favoritos aún</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="font-bold mb-4">Favoritos ({favoritos.length})</h2>
      <div className="space-y-4">
        {favoritos.map((episode: Episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  );
}