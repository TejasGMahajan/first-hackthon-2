document.body.innerHTML =
    `
    <div class="header">
    <h2>Pokemon API</h2>
    </div><div class="body-div"></div>
`;

const fetchPokemonData = async () => {
    const data = await fetch("https://pokeapi.co/api/v2/pokemon")
    const pokemonData = await data.json();
    const name = [];
    const url = [];

    for (let i = 0; i < pokemonData.results.length; i++) {
        name.push(pokemonData.results[i].name);
        url.push(pokemonData.results[i].url);

        const getUrlData = async () => {
            const response = await fetch(url[i])
            const data = await response.json();
            let ability = [];
            let move = [];

            for (let i = 0; i < data.abilities.length; i++) {
                ability.push(data.abilities[i].ability.name);
            }

            for (let i = 0; i < 5; i++) {
                move.push(data.moves[i].move.name);
            }

            document.querySelector(".body-div").innerHTML +=
                `
                <div class="container">
                <div class="card-content">
                <div class="card">
                <img class="card-image" src="${data.sprites.front_default}"></img>
                <h2 class="name"><span class="key">Name : </span> ${pokemonData.results[i].name}</h2>
                <div> <span class="card-key">Abilities : </span>${ability}</div>
                <div> <span class="card-key">Moves : </span>${move}</div>
                <div> <span class="card-key">Weight : </span>${data.weight}</div>
                
                
            `;
            
        }
        getUrlData();
    }
}
fetchPokemonData();

  function getPagelist(totalPages, page, maxLength){
    function range(start, end){
        return Array.form(Array(end - start + 1), (_, i) => i + start);
    }
    var sideWidth = maxLength < 9 ? 1: 2;
    var leftWidth = (maxLength - sideWidth * 2 - 3) >>1;
    var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

    if(totalPages <= maxLength){
        return range(1, totalPages);
    }

    if(page <= maxLength - sideWidth - 1 - rightWidth){
        return range(1, maxLength - sideWidth -1).concat(0, range(totalPages - sideWidth + 1, totalPages));
    }

    if(page >= totalPages - sideWidth - 1 - rightWidth){
        return range(1, sideWidth).concat(0, range(totalPages - sidewidth - 1 - rigthtWidth - leftWidth, totalPages));
    }
    return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
  }
  
 