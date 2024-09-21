const POKEMON_API = "https://pokeapi.co/api/v2/";

// API Call for HOMEPAGE
// Fetch basic Pokémon list with names
export async function getPokemonList(offset = 0, limit = 20) {
  const response = await fetch(`${POKEMON_API}pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();

  // Fetch details for each Pokémon to get their image
  const pokemonDetailsPromises = data.results.map(async (pokemon: any) => {
    const pokemonDetails = await getPokemonDetails(pokemon.name);
    return {
      name: pokemonDetails.name,
      image: pokemonDetails.sprites.other["official-artwork"].front_default, // Get the front image URL
    };
  });

  // Wait for all Pokémon details to be fetched
  const detailedPokemonList = await Promise.all(pokemonDetailsPromises);

  return detailedPokemonList;
}

// API Call for Specific Pokemon Page
// Fetch individual Pokémon details including image
export async function getPokemonDetails(name: string) {
  const response = await fetch(`${POKEMON_API}pokemon/${name}`);
  const data = await response.json();
  return data;
}
