import fetch from 'node-fetch';

const getPokemons = async (limit = 10) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar Pokémon: ${response.statusText}`);
        }
        const data = await response.json();
        return data.results; 
    } catch (error) {
        console.error(error);
        return [];
    }
};

const getPokemonData = async (pokemonName) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar Pokémon: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const main = async () => {
    const pokemons = await getPokemons(10); 

    if (pokemons.length > 0) {
        for (const pokemon of pokemons) {
            console.log(`Nome: ${pokemon.name}`);
            const details = await getPokemonData(pokemon.name); 
            if (details) {
                console.log(`  Altura: ${details.height}`);
                console.log(`  Peso: ${details.weight}`);
                console.log(`  Tipos: ${details.types.map(type => type.type.name).join(', ')}`);
            }
        }
    } else {
        console.log('Nenhum Pokémon encontrado.');
    }
};

main();