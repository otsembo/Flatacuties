// Your code here

const BASE_URL = "http://localhost:3000/characters/"

class Character{

  id; name; image; votes;

  constructor(id, name, image, votes) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.votes = votes;
  }

}

document.addEventListener('DOMContentLoaded', ()=>{

  getCharacters();
  loadCharacter("1")

  document.getElementById("votes-form").addEventListener("submit", (e)=>{
    e.preventDefault();
    let votes = document.getElementById("votes").value;
    console.log("DATA")
    submitVotesForm(votes)
  })

  document.getElementById("reset-btn").addEventListener("click", ()=>{
    submitVotesForm(0);
  })


})

function getCharacters(){

  const bar = document.getElementById("character-bar");

  fetch(BASE_URL)
    .then( response => response.json() )
    .then( (result) => {

      result.forEach(
        (character) => {
          let characterInfo = new Character(character.id, character.name, character.image, character.votes);
          let itemContainer = document.createElement("div");
          itemContainer.classList.add("charStyle")
          let itemName = document.createElement("h2");
          itemName.innerText = characterInfo.name
          itemContainer.append(itemName)
          bar.append(itemContainer)

          itemName.addEventListener("click", ()=>{
            loadCharacter(characterInfo.id)
          })

        }
      )

    }).catch( error => {throw error})

}

function loadCharacter(id){

  fetch(BASE_URL+id)
    .then( response => response.json() )
    .then( (character) => {
          let characterInfo = new Character(character.id, character.name, character.image, character.votes);
          document.getElementById("name").innerText = characterInfo.name
          document.getElementById("image").src = characterInfo.image
          document.getElementById("vote-count").innerText = characterInfo.votes
        }

      )
    .catch( error => {throw error})
}

function submitVotesForm(votes){
  document.getElementById("vote-count").innerText = votes
}

