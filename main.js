const searchPokemon = async () => {
  const searchTerm = document.getElementById("pokemon_search").value.toLowerCase();
  const pokemonData = await getPokemonData(searchTerm);
  if (pokemonData) {
    displayPokemonData(pokemonData);
  } else {
    alert("The Pokémon you are looking for could not be found. Please try again.");
  }
};

async function getPokemonData(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    const speciesResponse = await fetch(data.species.url);
    const speciesData = await speciesResponse.json();
    return { ...data, speciesData };
  } catch (error) {
    return null;
  }
}

function createListItem(text) {
  const li = document.createElement('li');
  li.textContent = text;
  return li;
}

function displayPokemonData(pokemon) {
  document.getElementById("pkm_name").textContent = pokemon.name.toUpperCase();
  document.getElementById("pkm_id").textContent = `ID: ${pokemon.id}`;
  
  document.getElementById("pkm_image").src = pokemon.sprites.other['official-artwork'].front_default;
  document.getElementById("pkm_hp").textContent = pokemon.stats[0].base_stat;
  document.getElementById("pkm_atk").textContent = pokemon.stats[1].base_stat;
  document.getElementById("pkm_def").textContent = pokemon.stats[2].base_stat;
  document.getElementById("pkm_sp_atk").textContent = pokemon.stats[3].base_stat;
  document.getElementById("pkm_sp_def").textContent = pokemon.stats[4].base_stat;
  document.getElementById("pkm_speed").textContent = pokemon.stats[5].base_stat;

  document.getElementById("pkm_height").textContent = `${pokemon.height / 10} m`;
  document.getElementById("pkm_weight").textContent = `${pokemon.weight / 10} kg`;

  const description = pokemon.speciesData.flavor_text_entries.find(entry => entry.language.name === "en");
  document.getElementById("pkm_pokedex_entry").textContent = description.flavor_text;

  const abilities = pokemon.abilities.map(ability => ability.ability.name).join(", ");
  const pkmAbilities = document.getElementById("pkm_abilities");
  pkmAbilities.innerHTML = '';
  for (const ability of pokemon.abilities) {
    const li = document.createElement('li');
    li.textContent = ability.ability.name;
    pkmAbilities.appendChild(li);
  }

  const pkmTypes = document.getElementById("pkm_types");
  pkmTypes.innerHTML = '';
  for (const type of pokemon.types) {
    const li = document.createElement('li');
    li.textContent = type.type.name;
    pkmTypes.appendChild(li);
  }
}

document.getElementById("make_search").addEventListener("click", searchPokemon);

// Function to show a random Pokémon between 1 and 1010 when the page loads
async function showRandomPokemon() {
  const randomId = Math.floor(Math.random() * 1010) + 1;
  const randomPokemonData = await getPokemonData(randomId);
  if (randomPokemonData) {
    displayPokemonData(randomPokemonData);
  }
}

// Call the function to display a random Pokémon when the page loads
showRandomPokemon();