import { Episode } from '../types/episode';
import EpisodeCard from './EpisodeCard';

interface EpisodesListProps {
  episodes: Episode[];
}

export default function EpisodesList({ episodes }: EpisodesListProps) {
  if (!episodes || episodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg">No hay episodios</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="space-y-4">
        {episodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  );
}