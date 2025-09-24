import { Character, Episode, EpisodeApiResponse } from '../types/episode';

export async function fetchEpisodesWithCharacters(): Promise<Episode[]> {
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
        
        return {...episode,charactersData: validCharacters,};
      })
    );
    
    return episodesWithCharacters;
  }

export async function fetchCharactersByIds(ids: string[]): Promise<Character[]> {
  try {
    const idsString = ids.join(',');
    const response = await fetch(`https://rickandmortyapi.com/api/character/${idsString}`);
    
    if (!response.ok) {
      console.error('Error fetching characters:', response.statusText);
      return [];
    }
    
    const data = await response.json();
    
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching characters by IDs:', error);
    return [];
  }
}

