// export default function UserForm() {
//     const schema = z.object({
//       nombre: z.string().min(1, 'Nombre requerido'),
//       email: z.string().email('Email inválido'),
//     });
//     type FormData = z.infer<typeof schema>;
    
//     function handleSubmit(onSubmit: any): import("react").FormEventHandler<HTMLFormElement> | undefined {
//         throw new Error("Function not implemented.");
//     }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <input {...register('nombre')} placeholder="Nombre" className="border p-2 w-full" />
//           {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}
//     </form>
//   );
// }