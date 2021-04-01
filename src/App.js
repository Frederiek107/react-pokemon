import React, {useState, useEffect} from 'react';
import './App.css';
import axios from "axios";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import pokemonlogo from "./assets/pokemonlogo.jpg"

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

    return (
        <div className='page'>
            <header>
            <img src={pokemonlogo} id='logo' alt='pokemonlogo'/>
            <div id='buttons'>
            <button onClick={()=>offset>0 && setOffset(offset-20)}>Previous</button>
            <button onClick={()=>offset <1099 && setOffset(offset+20)}>Next</button>
            </div>
            </header>
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
