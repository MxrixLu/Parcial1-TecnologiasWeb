import { Episode } from '../types/episode';
import EpisodeCard from './EpisodeCard';

interface EpisodesListProps {
  episodes: Episode[];
}

export default function EpisodesList({ episodes }: EpisodesListProps) {

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