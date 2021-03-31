import React, {useState, useEffect} from "react";
import axios from "axios";
import './PokemonCard.css'

function PokemonCard({id}) {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonImage, setPokemonImage] = useState(null);
    const [pokemonAbilities, setPokemonAbilities] = useState([]);
    const [weight, setWeight] = useState(0);
    const [moves, setMoves] = useState(0);

    async function fetchData() {
        const data = await axios.get(`${id}`);
        return data;
    }

    useEffect(() => {
        async function catchPokemonName() {
            try {
                const result = await fetchData();
                result && setPokemonName(result.data.name)
            } catch (error) {
                console.error(error);
            }
        }

        catchPokemonName();
    }, [id])

    useEffect(() => {
        async function catchPokemonImage() {
            try {
                const result = await fetchData();
                const image = result.data.sprites.front_default;
                image && setPokemonImage(image)
            } catch (error) {
                console.error(error);
            }
        }

        catchPokemonImage();
    }, [id])

    useEffect(() => {
        async function catchPokemonAbilities() {
            try {
                const result = await fetchData();
                const abilitiesArray = result.data.abilities;
                const abilityNames = abilitiesArray && abilitiesArray.map((ability) => {
                    return ability.ability.name + " ";
                })
                setPokemonAbilities(abilityNames);
            } catch (error) {
                console.error(error);
            }
        }

        catchPokemonAbilities();
    }, [id])

    useEffect(() => {
        async function catchPokemonWeight() {
            try {
                const result = await fetchData();
                const weight = result.data.weight;
                weight && setWeight(weight);

            } catch (error) {
                console.error(error);
            }
        }

        catchPokemonWeight();
    }, [id])

    useEffect(() => {
        async function catchPokemonMoves() {
            try {
                const result = await fetchData();
                const moves = result.data.moves;
                moves && setMoves(moves.length);
            } catch (error) {
                console.error(error);
            }
        }

        catchPokemonMoves();
    }, [id])

    return (
        <div className='pokemoncard'>
            <p id='name'>{pokemonName} </p>
            <p><img src={pokemonImage} alt='pokemon'/></p>
            <p id='abilities'>Abilities: {pokemonAbilities}</p>
            <p>Weight: {weight} lbs</p>
            <p>Moves: {moves}</p>
        </div>
    )
}

export default PokemonCard;