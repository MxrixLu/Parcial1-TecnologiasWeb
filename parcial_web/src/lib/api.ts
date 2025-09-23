import { Character, Episode, EpisodeApiResponse } from '../types/episode';

export async function fetchEpisodesWithCharacters(): Promise<Episode[]> {
  try {
    const episodesRes = await fetch('https://rickandmortyapi.com/api/episode', {
      next: { revalidate: 60 },
    });
    
    
    const episodesData: EpisodeApiResponse = await episodesRes.json();
    
    const episodesWithCharacters = await Promise.all(
      episodesData.results.map(async (episode) => {
        const characterUrls = episode.characters.slice(0, 5);
        
        const charactersData = await Promise.all(
          characterUrls.map(async (url) => {
              const characterRes = await fetch(url, {
                next: { revalidate: 60 },
              });
              if (characterRes.ok) {
                return await characterRes.json() as Character;
              }
              return null;

          })
        );
        
        const validCharacters = charactersData.filter((char): char is Character => char !== null);
        
        return {
          ...episode,
          charactersData: validCharacters,
        };
      })
    );
    
    return episodesWithCharacters;
  } catch (error) {
    console.error('Error fetching episodes with characters:', error);
    return [];
  }
}
