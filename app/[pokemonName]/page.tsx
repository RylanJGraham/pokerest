// app/[pokemonName]/page.tsx
import PokemonClientComponent from "@/components/PokemonClientComponent";
import { getPokemonDetails } from "@/lib/pokemonAPI";

export default async function PokemonPage({ params }: { params: { pokemonName: string } }) {
    // Object destructuring
    const { pokemonName } = params;
    // Get the API data
    const pokemonObject = await getPokemonDetails(pokemonName);

    // Pass data as props to the client component
    return <PokemonClientComponent pokemonObject={pokemonObject} pokemonName={pokemonName} />;
}
