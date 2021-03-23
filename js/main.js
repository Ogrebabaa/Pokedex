var request = new  XMLHttpRequest()
var list_poke
// Items du DOM
var dom_poke_name = document.getElementById("name_pokemon")
var dom_poke_img = document.getElementById("img_pokemon")

// Méthodes
let playSound = (pokeName) => {
    //! a finir
    let url = "http://www3.futaie.org:4281/~moreauv/pokedex/sons/"
    fetch("http://localhost:8888/pokedex-v2/cries.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        index = 0
        data.forEach(element => {
            filename_from_json = element.fileName.toLowerCase()
            if (filename_from_json.includes(pokeName.toLowerCase()+".wav")) {
                url += element.fileName
                // console.log(url);
                let audio = new Audio(url)
                audio.play();
            }
        });
        

    })
    
}

let getJapanName = (poke_name) => {
    let japaneseName = ""
    request.open('GET', 'https://pokeapi.co/api/v2/pokemon-species/'+poke_name, true)
    request.onload = function () {
    // Begin accessing JSON data here

        if (request.status >= 200 && request.status < 400) {
            let data = JSON.parse(this.response)
            japaneseName = data["names"][0]["name"]
            dom_poke_name.innerHTML += " ["+japaneseName+"]"
        } else {
            console.log('Erreur de chargement des pokémons.')
        }
    }
    request.send()
}

let getPokemon = (id, shiny) => {
    let pokemon_info = {}
    let jp_name = ""
    request.open('GET', 'https://pokeapi.co/api/v2/pokemon/'+id+'?language=ja', true)
    request.onload = function () {
    // Begin accessing JSON data here

        if (request.status >= 200 && request.status < 400) {
            let pokemon_data = JSON.parse(this.response)
            pokemon_info["name"] = pokemon_data.name

            pokemon_info["id"] = pokemon_data.id
            if (shiny == true) {
                pokemon_info["img"] = pokemon_data.sprites.front_shiny 
            } else {
                // pokemon_info["img"] = pokemon_data.sprites.other.dream_world.front_default
                pokemon_info["img"] = pokemon_data.sprites.front_default
            }
            
            dom_poke_name.innerHTML = pokemon_info["name"]
            getJapanName(pokemon_info["name"])
            dom_poke_img.src = pokemon_info["img"]
            dom_poke_img.alt = pokemon_info["id"]

            playSound(pokemon_info["name"])
            
        } else {
            console.log('Erreur de chargement des pokémons.')
        }
    }
    request.send()
    return pokemon_info
}

let nextPokemon = () => {
    let id_current_poke = dom_poke_img.alt
    let new_id = Number(id_current_poke) + 1
    let pokemon_info = getPokemon(new_id, false)
}

let prevPokemon = () => {
    let id_current_poke = dom_poke_img.alt
    let new_id = Number(id_current_poke) - 1
    let pokemon_info = getPokemon(new_id , false)
}

let search = () => {
    let dom_input_form = document.getElementById("in_pokemon").value
    let poke_to_search = dom_input_form
    request.open('GET', 'https://pokeapi.co/api/v2/pokemon/'+poke_to_search, true)
    request.onload = function () {
    // Begin accessing JSON data here
        

        if (request.status >= 200 && request.status < 400) {
            let data = JSON.parse(this.response)
            console.log(data);
            id = data["id"]
            getPokemon(id, false)

        } else if(request.status == 404) {
            console.log('Pokémon introuvable.')
            dom_poke_img.src = "https://media1.tenor.com/images/a828888852e708d9afaaad06c7f9513f/tenor.gif?itemid=10251428"
            dom_poke_name.innerHTML = "Pokémon introuvable."
        } else {
            console.log('Erreur de chargement des pokémons.')
        }
    }
    request.send()
}

let goShiny = () => {
    let id_current_poke = dom_poke_img.alt
    let pokemon_info = getPokemon(id_current_poke , true)
}

// Main
    //pour que le formulaire ne refresh pas la page
var form = document.getElementById("search");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

request.open('GET', 'https://pokeapi.co/api/v2/pokemon', true)
request.onload = function () {
  // Begin accessing JSON data here

    if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(this.response)
        list_poke = data.results    
        pokemon_info = getPokemon(1)

    } else {
        console.log('Erreur de chargement des pokémons.')
    }
}
request.send()

