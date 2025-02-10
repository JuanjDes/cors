// traer info de nuestra api de rick and morty
const searchInput = document.getElementById('characterName');
const searchBoton = document.getElementById('searchBtn');
const characterList = document.getElementById('characterList');
const linkCharacters = document.getElementById('linkCharacters');
const url = 'http://localhost:3000/characters';

const characters = async () => {
    try {
        const response = await fetch(url);
        const characters = await response.json();
        characters.forEach(character => {
            characterList.innerHTML += `
                <div class="characterDiv">
                    <img src="${character.image}" alt="${character.name}"/>
                    <li>Name: ${character.name}</li>
                    <li>Name: ${character.status}</li>
                    <li>Name: ${character.species}</li>
                    <li>Name: ${character.gender}</li>
                    <li>Name: ${character.originName}</li>
                </div>
            `;
            
        });
        
    } catch (error) {
        characterList.innerHTML = `<li>Error al obtener información</li>`;
    }
}

const getCharacter = async () => {
    const inputValue = searchInput.value.toLowerCase();

    try {
        const response = await fetch(`${url}?name=${inputValue}`);
        const character = await response.json();
        characterList.innerHTML = `
            <div class="characterDiv">
                <img src="${character.image}" alt="${character.name}"/>
                <li>Name: ${character.name}</li>
                <li>Name: ${character.status}</li>
                <li>Name: ${character.species}</li>
                <li>Name: ${character.gender}</li>
                <li>Name: ${character.originName}</li>
            </div>
        `;

    } catch (error) {
        characterList.innerHTML = `<li>No se encontró el personaje</li>`;
    }
}

searchBoton.addEventListener('click', () => {
    charactersList.innerHTML = ' ';
});