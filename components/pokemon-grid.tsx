"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { PokemonCard } from "./pokemon-card";
import { Button } from "./ui/button";
import { getPokemonList } from "@/lib/pokemonAPI";

interface PokemonGridProps {
  initialPokemonList: any;
}

export function PokemonGrid({ initialPokemonList }: PokemonGridProps) {
  const [pokemonList, setPokemonList] = useState<any[]>(initialPokemonList || []);
  const [searchText, setSearchText] = useState("");
  const [offset, setOffset] = useState(20);
  const [loading, setLoading] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false); // Track spinning state of load button

  // Filter the Pokémon list based on the search text
  const searchFilter = (list: any[]) => {
    return list.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  // Save the filtered array
  const filteredPokemonList = searchFilter(pokemonList);

  // Fetch more Pokémon when "Load More" is clicked
  const loadMorePokemon = async () => {
    setLoading(true); // Start loading
    setIsSpinning(true); // Start spinning animation

    try {
      const newPokemonList = await getPokemonList(offset, 20); // Fetch next 20 Pokémon
      setPokemonList((prevList) => [...prevList, ...newPokemonList]); // Append new Pokémon to the list
      setOffset((prevOffset) => prevOffset + 20); // Update offset for next fetch
    } catch (error) {
      console.error("Failed to load more Pokémon:", error);
    } finally {
      setLoading(false); // Stop loading
      setIsSpinning(false); // Stop spinning animation
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes spinOnce {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-once {
          animation: spinOnce 1s ease-out;
        }
      `}</style>
      
      <div className="w-full py-10">

        {/* Pokemon Filtering Text Input */}
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-red-400 text-xl" htmlFor="pokemonName">Filter by Pokémon Name</Label>
          <Input
            type="text"
            value={searchText}
            autoComplete="off"
            id="pokemonName"
            placeholder="Charizard, Pikachu, etc"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <h3 className="text-4xl pt-12 pb-6">Pokémon Collection</h3>
        <div className="bg-white w-full h-1"></div>
      </div>

      {/* Pokemon Grid */}
      <div className="grid gap-6 px-4 py-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-items-center mx-auto max-w-screen-xl w-full">
        {filteredPokemonList.map((pokemon: any) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} image={pokemon.image} />
        ))}
      </div>

      {/* Fixed button position Load More +20 */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center">
        <Button 
          className="bg-red-500 flex items-center font-semibold px-8 py-8"
          onClick={loadMorePokemon}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
            alt="Pokéball"
            className={`w-12 h-12 mr-2 ${isSpinning ? 'animate-spin-once' : ''}`}
          />
          <p className="text-4xl text-white">Load More</p>
        </Button>
      </div>
    </>
  );
}
