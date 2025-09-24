'use client'
import { Episode } from "@/types/episode";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { fetchCharactersByIds } from "@/lib/api";
import { useState } from "react";

interface UserFormProps {
  onCreateItem: (nuevo: Episode) => void;
}

interface FormData {
  titulo: string;
  personajes: string;
}

export default function UserForm({ onCreateItem }: UserFormProps) {
    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { errors } 
    } = useForm<FormData>();
    
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        
        try {
            // Obtener datos de los personajes desde la API
            const characterIds = data.personajes.split('-');
            const charactersData = await fetchCharactersByIds(characterIds);
            
            const nuevoEpisode: Episode = {
                id: Date.now(),
                name: data.titulo,
                air_date: new Date().toLocaleDateString('es-ES'),
                episode: `S01E${Date.now().toString().slice(-2)}`,
                characters: characterIds.map(id => `https://rickandmortyapi.com/api/character/${id}`),
                charactersData: charactersData, 
                url: '',
                created: new Date().toISOString(),
            };
            
            onCreateItem(nuevoEpisode);
            toast.success(`Episodio "${data.titulo}" guardado correctamente con ${charactersData.length} personajes`);
            reset();
        } catch (error) {
            console.error('Error creating episode:', error);
            toast.error('Error al crear el episodio. Verifica que los IDs de personajes sean válidos.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Campo Título */}
            <div>
                <input 
                    {...register("titulo", {
                        required: "El título es requerido",
                        minLength: {
                            value: 6,
                            message: "El título debe tener mínimo 6 caracteres"
                        }
                    })}
                    placeholder="Título (mínimo 6 caracteres)" 
                    className="border p-2 w-full rounded"
                />
                {errors.titulo && (
                    <div className="text-red-500 text-sm mt-1">
                        {errors.titulo.message}
                    </div>
                )}
            </div>
            
            {/* Campo Personajes */}
            <div>
                <input 
                    {...register("personajes", {
                        required: "Los IDs de personajes son requeridos",
                        pattern: {
                            value: /^\d+-\d+-\d+-\d+-\d+$/,
                            message: "Formato inválido. Use: 12-14-1-23-8 (5 IDs separados por guiones)"
                        }
                    })}
                    placeholder="IDs de personajes (ej: 12-14-1-23-8)" 
                    className="border p-2 w-full rounded"
                />
                {errors.personajes && (
                    <div className="text-red-500 text-sm mt-1">
                        {errors.personajes.message}
                    </div>
                )}
            </div>
            
            <button 
                type="submit" 
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Cargando personajes...' : 'Crear Episodio'}
            </button>
        </form>
    );
}
