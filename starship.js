let nameH1;
let birthYearSpan;
let heightSpan;
let massSpan;
let filmsDiv;
let planetDiv;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    mglt = document.querySelector('span#mglt');
    starshipClass = document.querySelector('span#starship-class');
    hyperdriveRating = document.querySelector('span#hyperdrive-rating');
    pilotsList = document.querySelector('ul#pilotsList');
    
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getStarship(id)
});

async function getStarship(id) {
    let starship;
    let pilots;
    try {
        starship = await fetchStarshipId(id)


        pilots = await fetchShipPilots(id

            )
    }
    catch (ex) {
        console.error(`Error reading starship
         ${id} data.`, ex.message);
    }
    renderStarship(starship, pilots);

}
async function fetchStarshipId(id) {
    let starshipUrl = `${baseUrl}/starships/${id}`;
    return await fetch(starshipUrl)
        .then(res => res.json())
}

async function fetchShipPilots(id) {
    let pilotsUrl = `${baseUrl}/starships/${id}/characters`;
    return await fetch(pilotsUrl)
        .then(res => res.json())


}

const renderStarship
    = (starship, pilots) => {
        document.title = `SWAPI - ${starship
            ?.name}`;  // Just to make the browser tab say their name
        mglt.textContent = starship
            ?.MGLT;
        starshipClass.textContent = starship
            ?.starship_class;
        hyperdriveRating.textContent = starship
            ?.hyperdrive_rating;

        for (let i = 0; i < pilots.length; i++){
            // pilots.innerHTML = `<li> item </li>`

            const pilot = document.createElement("button")

            pilot.addEventListener("click", () => {
                window.location.href = `/character.html?id=${pilots[i].id}`
            })


            pilot.textContent = pilots[i].name
            pilotsList.appendChild(pilot)

            }
       
    }
