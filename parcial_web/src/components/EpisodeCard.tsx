'use client'
import { Episode } from '../types/episode';
import { cn } from '../lib/utils';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useFavorites } from '../lib/FavoritesContext';
import { toast } from "sonner";



interface EpisodeCardProps {
  episode: Episode;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  const displayCharacters = episode.charactersData.slice(0, 5) || [];
  const { toggle, isFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(episode.id);

  const handleFavoriteClick = () => {
    toggle(episode);
    if (isCurrentlyFavorite) {
      toast.info(`"${episode.name}" removido de favoritos`);
    } else {
      toast.success(`"${episode.name}" añadido a favoritos ❤️`);
    }
  };
  
  return (
    <div className={cn(
      "bg-white rounded-lg ",
      "flex flex-col space-y-4 w-full relative"
    )}>
      <button
        onClick={handleFavoriteClick}
        className={cn("absolute top-3 right-3",
          isCurrentlyFavorite? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-500"
        )}
      >
        <Heart 
          size={20} 
          className={isCurrentlyFavorite ? "fill-current" : ""} 
        />
      </button>

      {/* Episode Fecha */}
      <div className="text-sm text-gray-500 ">{episode.air_date}</div>

      {/* Episode Título */}
      <h3 className="text-lg text-gray-800">{episode.name}</h3>

      {/* personajes */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-600">Personajes:</h4>
        <div className="grid grid-cols-5">
          {displayCharacters.map((character) => (
            <div key={character.id} className="flex flex-col items-center">
              <div className="relative w-12 h-12">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  className="object-cover rounded-full"
                  sizes="48px"
                />
              </div>
              <span className="text-xs text-gray-600 text-center ">
                {character.name}
              </span>
            </div>
          ))}
          
          {Array.from({ length: Math.max(0, 5 - displayCharacters.length) }).map((_, index) => (
            <div key={`placeholder-${index}`} className="flex items-center space-y-1">
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
