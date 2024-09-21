import Link from "next/link";

interface PokemonCardProps {
  name: string;
  image: string; 
}

export function PokemonCard({ name, image }: PokemonCardProps) {
  return (
    <Link href={`/${name}`}>
      <div className="relative border rounded-lg shadow-lg w-48 h-64 flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:border-white hover:border-4 hover:border-solid">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-slate-600 bg-opacity-15"  // Static background image
        ></div>

        {/* Pokémon image */}
        <div className="flex-grow flex items-center justify-center p-2 z-10">
          <img 
            src={image} 
            alt={name} 
            className="object-contain w-3/4 h-3/4 transition-transform transform hover:scale-150" // Enlarge on hover
          />
        </div>
        
        {/* Bottom red stripe */}
        <div className="bg-red-500 p-4 w-full text-center text-white text-xl font-semibold z-10 transition-colors hover:bg-red-600">
            {name.charAt(0).toUpperCase() + name.slice(1)}
        </div>
      </div>
    </Link>
  );
}
