import React, {useState, useEffect} from 'react';
import './App.css';
import axios from "axios";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import pokemonlogo from "./assets/pokemonlogo.jpg"

//Elk pokémon kaartje bevat een naam, een afbeelding, lijst van abilities, gewicht, en de hoeveelheid moves.
//[X] NAAM -- https://pokeapi.co/api/v2/pokemon.name
//[X] AFBEELDING -- {https://pokeapi.co/api/v2/pokemon.url}.sprites.front-default
//[X] ABILITIES -- https://pokeapi.co/api/v2/ability/{id or name}/
//[X]GEWICHT -- https://pokeapi.co/api/v2/pokemon/{id or name}.weight
//[]AANTAL MOVES -- https://pokeapi.co/api/v2/pokemon/{id or name}.moves.length

//VOLGENDE STAP: zet eerst je array in de state. Map daar vervolgens overheen. Zet in de return van je map-functie een ul met in elk li-item het losse item.

function App() {
    const [IDArray, setIDarray] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        async function getID() {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
                const arrayWithURLS = result.data.results.map((pokemon) => {
                    return pokemon.url;
                })
                setIDarray(arrayWithURLS);
            } catch (error) {
                console.error(error);
            }
        }
        getID();
    }, [{offset}])

    /*useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0');
                console.log(result.data);
                const namesArray = result.data.results.map((pokemon) => {
                    return pokemon.name;
                });
                console.log(namesArray);
                return namesArray;
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [])

    useEffect(() => {
        async function fetchOtherData() {
            try {
                const result = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0');
                /!*setList(result.data.results)*!/
                for (const pokemon of result.data.results) {
                    const url = pokemon.url;
                    console.log(url);
                    const response = await axios.get(url);
                    console.log(response);
                    const name = response.data.name;
                    console.log(name);
                    const image = response.data.sprites.front_default;
                    console.log(image);
                    const abilitiesArray = response.data.abilities;
                    const abilities = abilitiesArray.map((ability) => {
                        console.log(ability.ability.name);
                        return ability.ability.name + " ";
                    })
                    const weight = response.data.weight;
                    console.log(weight);
                    const moves = response.data.moves.length;
                    console.log(moves);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchOtherData();
    }, [])*/

    return (
        <div className='page'>
            <img src={pokemonlogo} id='logo' alt='pokemonlogo'/>
            <div id='buttons'>
            <button onClick={()=>offset>0 && setOffset(offset-20)}>Previous</button>
            <button onClick={()=>offset <1099 && setOffset(offset+20)}>Next</button>
            </div>
                <div id="pokemondata">
            {IDArray.map((ID) => {
                return  <PokemonCard
                        id={ID}
                        key={ID}/>
            })}
            </div>
        </div>
    );
}

export default App;
