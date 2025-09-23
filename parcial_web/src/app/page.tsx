import EpisodesList from '../components/EpisodesList'; 
import Favorites from '../components/Favorites'; 
import { fetchEpisodesWithCharacters } from '../lib/api';

export default async function Home() {
  const episodes = await fetchEpisodesWithCharacters();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Rick and Morty Episodios
        </h1>
        
        {/* Layout with episodes on the left */}
        <div className="flex gap-8">
          {/* Left column - Episodes */}
          <div className="flex-shrink-0">
            <EpisodesList episodes={episodes} />
          </div>
          
          {/* Right column - Other content */}
          <div className="flex-1">
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
              <Favorites />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
