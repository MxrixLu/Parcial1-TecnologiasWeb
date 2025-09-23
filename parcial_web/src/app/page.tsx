import { useState } from 'react';
import EpisodesList from '../components/EpisodesList'; 
import Favorites from '../components/Favorites'; 
import UserForm from '../components/UserForm';
import { fetchEpisodesWithCharacters } from '../lib/api';
import { Episode } from '@/types/episode';

export default async function Home() {
  const episodes = await fetchEpisodesWithCharacters();
  const [setEpisodes] = useState(episodes);
  const addEpisode = (nuevo: Episode) => setEpisodes(prev => [...prev, nuevo]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Episodios y Personajes "RICK AND MORTY"
        </h1>
        
        <div className="flex gap-8">
          <div className="flex-shrink-0">
            <EpisodesList episodes={episodes} />
          </div>
          
          <div className="flex-1 space-y-6">
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
              <Favorites />
            </section>
            
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4">Formulario</h2>
              <UserForm onCreateItem={addEpisode} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
