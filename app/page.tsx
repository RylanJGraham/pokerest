
import { PokemonGrid } from "@/components/pokemon-grid";
import { getPokemonList } from "@/lib/pokemonAPI";

export default async function Home() {
  //Load in Data from API call on this page as it is a server component
  const initialPokemonList = await getPokemonList(0, 20);
  //--> Pass Data to a client component

  //Page features:
  // Text Input: Allows for Card Filtering:(use client) with useState to handle input
  // Inputted text -> filtered through data
  // Pokemon Grid -> Visual display of Pokemon (Text input shows cards as result of search filtering)

  //Passing Data to PokemonGrid
  // 1. Create Pokemon Grid component
  // 2. Load in data from Pokemon API
  // 3. Pass in data to Pokemon Grid

  return (
    <PokemonGrid initialPokemonList={initialPokemonList} />
  );
}
