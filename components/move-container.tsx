import React from 'react';
import Image from 'next/image';

// Type for the PokemonMove props
type PokemonMoveProps = {
    moveName: string;
    type: string;
    level: string;
};

export function PokemonMove({ moveName, type, level }: PokemonMoveProps) {
    const getTypeImage = (type: string) => {
        return `https://veekun.com/dex/media/types/en/${type}.png`;
    };

    return (
        <div className="group flex flex-col items-center rounded-lg border border-transparent p-4 transition-colors dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 w-full max-w-xs mx-auto">
            <div className="flex items-center mb-2">
                <h2 className="text-lg md:text-xl font-semibold mr-2 text-wrap">
                    {moveName.charAt(0).toUpperCase() + moveName.slice(1)}
                </h2>
                <Image
                    src={getTypeImage(type)}
                    alt={`${type} type`}
                    width={32}
                    height={32}
                />
            </div>
            <p className="text-sm md:text-base">Level: {level}</p>
        </div>
    );
}
