//1.- Hacer una petición a la PokeAPI para obtener cualquier Pokémon. Muestra sus tipos en consola mediante un for.
//[https://pokeapi.co/](https://pokeapi.co/)
//ejercio1


/*const nombrePokemon = "pikachu";

fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`No se pudo obtener la información del Pokémon ${nombrePokemon}.`);
        }
        return response.json();
    })
    .then(data => {
        const tiposPokemon = data.types.map(tipo => tipo.type.name);

        console.log(`Tipos de ${nombrePokemon.charAt(0).toUpperCase() + nombrePokemon.slice(1)}:`);
        tiposPokemon.forEach(tipo => {
            console.log(`- ${tipo}`);
        });
    })
    .catch(error => {
        console.error(error.message);
    });


// Escribe una función que al ejecutarse realice una petición a la API de Open Library. Buscar un libro y traer el o los autores del primer libro
//Ejemplo: peticionLibro("i robot");
//[http://openlibrary.org/search.json?q=i+robot](http://openlibrary.org/search.json?q=i+robot)
//ejercio2 
function peticionLibro(tituloLibro) {

    const tituloCodificado = encodeURIComponent(tituloLibro);


    fetch(`http://openlibrary.org/search.json?q=${tituloCodificado}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`No se pudo obtener la información del libro "${tituloLibro}".`);
            }
            return response.json();
        })
        .then(data => {

            if (data.docs.length > 0 && data.docs[0].author_name) {
                const autores = data.docs[0].author_name;
                console.log(`Autores del libro "${tituloLibro}": ${autores.join(", ")}`);
            } else {
                console.log(`No se encontraron autores para el libro "${tituloLibro}".`);
            }
        })
        .catch(error => {
            console.error(error.message);
        });
}


peticionLibro("i robot");

//ejercicio 3 
function peticionPorAutor(nombreAutor) {

    const autorCodificado = encodeURIComponent(nombreAutor);


    fetch(`http://openlibrary.org/search.json?author=${autorCodificado}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`No se pudo obtener la información del autor "${nombreAutor}".`);
            }
            return response.json();
        })
        .then(data => {

            if (data.docs.length > 0 && data.docs[0].title) {
                const libros = data.docs.map(libro => libro.title);
                console.log(`Libros de ${nombreAutor}:`);
                libros.forEach(libro => {
                    console.log(`- ${libro}`);
                });
            } else {
                console.log(`No se encontraron libros para el autor "${nombreAutor}".`);
            }
        })
        .catch(error => {
            console.error(error.message);
        });
}


peticionPorAutor("asimov");



//ejercicio 4 

function obtenerGeneroBanda(nombreBanda) {
    // Codificamos el nombre de la banda para incluirlo en la URL
    const bandaCodificada = encodeURIComponent(nombreBanda);

    // Hacemos la solicitud a la API de The Audio DB
    fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${bandaCodificada}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`No se pudo obtener la información de la banda "${nombreBanda}".`);
            }
            return response.json();
        })
        .then(data => {
            // Verificamos si hay resultados y si hay información sobre la banda
            if (data.artists && data.artists.length > 0) {
                const genero = data.artists[0].strGenre;
                console.log(`Género de ${nombreBanda}: ${genero}`);
            } else {
                console.log(`No se encontró información sobre la banda "${nombreBanda}".`);
            }
        })
        .catch(error => {
            console.error(error.message);
        });
}

obtenerGeneroBanda("coldplay");*/



//ejercicio 5 
async function personajes(idCharacter) {
    const urlBase = "https://swapi.dev/api/people/";
    const url = `${urlBase}${idCharacter}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener informacion del personaje. Codigo de respuesta: ${response.status}`)

            }
            return response.json();
        })
        .then(dataCharacter => {
            console.log(`Nombre del personaje: ${dataCharacter.name}`);
            console.log(`apariciones en peliculas: ${dataCharacter.films.length}`);

            Films(dataCharacter.films)
        })
        .catch(error => {
            console.error(error.message);
        })


}

async function Films(urlsFilms){
    console.log(`Informacion de las peliculas:`);

    const promesaFilms = urlsFilms.map(urlFilm =>{
        return fetch(urlFilm)
        .then(response =>{
            if(!response.ok){
                throw new Error (` Error ${reponse.status}`);
            }
            return response.json();
        })
        .then(dataFilm =>{
            console.log(` titulo: ${dataFilm.title}`);
            console.log(` Episodio:${dataFilm.episode_id}`);
            console.log(` Director: ${dataFilm.director}`);
            console.log(`-----------------`);
        })
    })
    return Promise.all(promesaFilms);
}

personajes(5);


//ejercicio 6

async function Pokemons150() {
    const limit = 155;
    const response = await fetch(` https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();

    const detailsPokemon = await Promise.all(
        data.results.map(async pokemon => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();

            return {
                name: pokemonData.name,
                moves: pokemonData.moves.map(move => move.move.name),
                types: pokemonData.types.map(type => type.type.name),
                height: pokemonData.height,
                with: pokemonData.with,
            };
        })
    );

    return detailsPokemon;
}
Pokemons150()
    .then(detalles => {
        console.log(detalles);
    })
    .catch(error => {
        console.error(error.message);
    })




//ejercicio 7
const apiKey = "SX3ZVvlpBfd2AhKlvvkRrySfRVngg6QsAoB56Xam";
const baseUrl = "https://api.nasa.gov/neo/rest/v1/feed";


const startDate = "2023-11-15";
const endDate = "2023-11-22";


const url = `${baseUrl}?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

fetch(url)
    .then(response => {

        if (!response.ok) {
            throw new Error(`Error de red - Código: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {

        const asteroids = data.near_earth_objects;


        for (const date in asteroids) {
            asteroids[date].forEach(asteroid => {
                if (asteroid.is_potentially_hazardous_asteroid) {
                    console.log(`Asteroid ID: ${asteroid.id}`);
                    console.log(`Nombre: ${asteroid.name}`);
                    console.log(`Fecha de aproximación: ${date}`);
                    console.log("----------");
                }
            });
        }
    })
    .catch(error => {
        console.error("Error al obtener datos:", error.message);
    });






