"use client";

import React, { useState, useEffect } from "react";
import { Progress } from "./ui/progress";
import { PokemonMove } from "./move-container";
import Image from 'next/image';

type PokemonClientComponentProps = {
    pokemonObject: any;
    pokemonName: string;
};

export default function PokemonClientComponent({ pokemonObject, pokemonName }: PokemonClientComponentProps) {
    const [showShiny, setShowShiny] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [moveDetails, setMoveDetails] = useState<any[]>([]);

    useEffect(() => {
        // Fetch move details when the component mounts
        const fetchMoveDetails = async () => {
            const moveDetailsPromises = pokemonObject.moves.map(async (move: any) => {
                const response = await fetch(`https://pokeapi.co/api/v2/move/${move.move.name}`);
                const moveData = await response.json();
                return {
                    name: move.move.name,
                    type: moveData.type.name,
                    level: move.version_group_details[0]?.level_learned_at || "N/A", // Retrieve level or default to "N/A"
                };
            });
            const results = await Promise.all(moveDetailsPromises);
            setMoveDetails(results);
        };

        fetchMoveDetails();
    }, [pokemonObject.moves]);

    // Get default and shiny images
    const defaultImage = pokemonObject.sprites.other["official-artwork"].front_default;
    const shinyImage = pokemonObject.sprites.other["official-artwork"].front_shiny;

    // Extract the types from the Pokémon object
    const pokemonTypes = pokemonObject.types.map((typeObj: any) => typeObj.type.name);

    const getTypeImage = (type: string) => {
        return `https://veekun.com/dex/media/types/en/${type}.png`;
    };

    // Determine number of moves per page and the total number of pages
    const movesPerPage = 4; // 2 rows x 3 columns
    const totalMoves = moveDetails.length;
    const totalPages = Math.ceil(totalMoves / movesPerPage);

    // Get the moves for the current page
    const currentMoves = moveDetails.slice(currentPage * movesPerPage, (currentPage + 1) * movesPerPage);

    // Change page
    const handlePageChange = (direction: "left" | "right") => {
        if (direction === "right" && currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "left" && currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="flex my-10  p-10 border border-gray-300 rounded-lg w-full">
            {/* Pokemon Image and Tabs */}
            <div className="w-2/3">
                {/* Image display */}
                <div className="relative flex justify-center">
                    <img
                        src={showShiny ? shinyImage : defaultImage}
                        alt={`${pokemonName} ${showShiny ? 'shiny' : 'default'}`}
                        className="w-1200 h-600 object-contain mx-auto"
                    />
                </div>
                <h2>View Model</h2>
                {/* Tabs for switching images */}
                <div className="flex align-start mt-4 gap-2">
                    <button
                        className={`px-4 py-2 border rounded ${!showShiny ? 'bg-red-800' : 'bg-opacity-0 border-red-800 border-x-2 border-y-2'}`}
                        onClick={() => setShowShiny(false)}
                    >
                        Default
                    </button>
                    <button
                        className={`px-4 py-2 border rounded ${showShiny ? 'bg-red-800' : 'bg-opacity-0 border-red-800 border-x-2 border-y-2'}`}
                        onClick={() => setShowShiny(true)}
                    >
                        Shiny
                    </button>
                </div>
            </div>

            {/* Pokemon Details */}
            <div className="w-2/3 pl-8">
                {/* Pokemon Name and Types */}
                <div className="flex items-center mb-4">
                    {/* Pokemon Name */}
                    <h1 className="text-4xl font-bold">{pokemonName.toUpperCase()}</h1>

                    {/* Type Images (inline with name) */}
                    <div className="flex ml-4">
                        {pokemonTypes.map((type: string, index: number) => (
                            <Image
                                key={index}
                                src={getTypeImage(type)}
                                alt={`${type} type`}
                                width={64} // Adjust size as needed
                                height={64}
                                className="ml-2"
                            />
                        ))}
                    </div>
                </div>

                {/* Pokemon Stats */}
                {pokemonObject.stats.map((statObject: any) => {
                    const statName = statObject.stat.name;
                    const statValue = statObject.base_stat;
                    return (
                        <div className="flex items-center mb-2" key={statName}>
                            <h3 className="w-1/2 text-lg">{statName}: {statValue}</h3>
                            <Progress className="w-1/2" value={statValue} />
                        </div>
                    );
                })}

                {/* Pokemon Moves */}
                <div className="mt-4">
                    {/* Moves Header and Navigation */}
                    <div className="flex items-center mb-4">
                        <h2 className="text-2xl font-bold">Pokemon Moves:</h2>
                        <button
                            onClick={() => handlePageChange("left")}
                            disabled={currentPage === 0}
                            className="ml-4 px-2  rounded-full bg-red-800 hover:bg-red-200 disabled:bg-gray-300"
                        >
                            &lt;
                        </button>
                        <button
                            onClick={() => handlePageChange("right")}
                            disabled={currentPage === totalPages - 1}
                            className="ml-2 px-2 rounded-full bg-red-800 hover:bg-red-200 disabled:bg-gray-300"
                        >
                            &gt;
                        </button>
                    </div>

                    {/* Moves Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {currentMoves.map((move: any, index: number) => (
                            <PokemonMove key={index} moveName={move.name} type={move.type} level={move.level === "N/A" ? "HM&TM" : move.level} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
