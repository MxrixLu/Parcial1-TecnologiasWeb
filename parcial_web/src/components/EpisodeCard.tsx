import { Episode } from '../types/episode';
import { cn } from '../lib/utils';
import Image from 'next/image';

interface EpisodeCardProps {
  episode: Episode;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  const displayCharacters = episode.charactersData.slice(0, 5) || [];
  
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200",
      "flex flex-col space-y-4 w-full"
    )}>
      {/* Episode Fecha */}
      <div className="text-sm text-gray-500 font-medium">
        {episode.air_date}
      </div>

      {/* Episode Título */}
      <h3 className="text-lg font-semibold text-gray-800">
        {episode.name}
      </h3>

      {/* personajes */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-600">Personajes:</h4>
        <div className="grid grid-cols-5 gap-2">
          {displayCharacters.map((character) => (
            <div key={character.id} className="flex flex-col items-center space-y-1">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  className="object-cover rounded-full"
                  sizes="48px"
                />
              </div>
              <span className="text-xs text-gray-600 text-center truncate w-full">
                {character.name}
              </span>
            </div>
          ))}
          
          {Array.from({ length: Math.max(0, 5 - displayCharacters.length) }).map((_, index) => (
            <div key={`placeholder-${index}`} className="flex flex-col items-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-xs">?</span>
              </div>
              <span className="text-xs text-gray-400">Cargando...</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
