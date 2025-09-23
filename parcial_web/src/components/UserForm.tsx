'use client'
import { Episode } from "@/types/episode";
import { useState } from "react";

export default function UserForm(onCreateItem: (nuevo: Episode) => any) {
    const [titulo, setTitulo] = useState('');
    const [personajes, setPersonajes] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (titulo.length < 6) {
            setError('El título debe tener mínimo 6 caracteres');
            return;
        }
        
        if (!personajes.trim()) {
            setError('Los personajes son requeridos');
            return;
        }

        const fechaCreacion = new Date().toLocaleDateString('es-ES');
        
        const nuevoEpisode: Episode = {
            id: Date.now(), // id temporal único
            name: titulo,
            air_date: new Date().toLocaleDateString('es-ES'),
            episode: '', // puedes dejarlo vacío o pedirlo en el formulario si lo necesitas
            characters: personajes.split(',').map(p => p.trim()),
            charactersData: [], // vacío porque no hay personajes reales
            url: '',
            created: new Date().toISOString(),
        };
        onCreateItem(nuevoEpisode);


        setError('');
        alert(`Título: ${titulo}\nPersonajes: ${personajes}\nFecha de creación: ${fechaCreacion}`);
        setTitulo('');
        setPersonajes('');


    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            
            <input 
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título (mínimo 6 caracteres)" 
                className="border p-2 w-full rounded"
                minLength={6}
            />
            
            <input 
                value={personajes}
                onChange={(e) => setPersonajes(e.target.value)}
                placeholder="Personajes" 
                className="border p-2 w-full rounded"
                required
            />
            
            <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Crear Episodio
            </button>
        </form>
    );
}
