let masterKeyShowing = false;
let teamArray;

document.addEventListener("DOMContentLoaded", (e)=> {

    console.log('connected to main.js')

    const masterKeyBtn = document.querySelector('#master-key-button');
    const masterKeyCard = document.querySelector('#master-key-card');

    masterKeyBtn.addEventListener('click', (e) => {

        //shows and hides the clue card
        masterKeyShowing = !masterKeyShowing;
        if (masterKeyShowing){
                masterKeyCard.style.display = 'block'
        }
        else{
                masterKeyCard.style.display = 'none'
        }
    });
    fetchTeams();
    fetchWordArray();
    // const wordArray = fetchWordArray();
    // debugger;
    // populateCards(wordArray);
    
});



function populateCards(wordArray){
    
    let randWords = wordShuffler(wordArray);
    console.log(randWords);
    let gameWords = randWords.slice(0,10);
    gameWords[0].team_id = teamArray[0].id
    gameWords[1].team_id = teamArray[1].id
    gameWords.slice(2,6).forEach( word => word.team_id = teamArray[2].id)
    gameWords.slice(6,10).forEach( word => word.team_id = teamArray[3].id)

    gameWords = wordShuffler(gameWords);
    for(let i = 0; i<gameWords.length; i++){
        renderCard(gameWords[i], i)
    }
    
}

function renderCard(word, index){
    let wordContainer = getWordContainer();
    let newCardDiv = document.createElement('div');
    newCardDiv.innerText = word.name;
    newCardDiv.dataset.location = index;
    newCardDiv.dataset.team = word.team_id
    newCardDiv.addEventListener('click', (e) => wordHandler(e))
    wordContainer.append(newCardDiv);
    
}


function wordShuffler(array) {
    let newArray = array;
    let i = newArray.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;

    }
    return newArray;
}

// event handlers
function wordHandler(event){

    console.log(`This card belongs to ${event.target.dataset['team']}`)
    debugger;
}


// element fetchers and url fetchers 

function wordURL(){
    return 'http://localhost:3000/words'
}

function teamURL(){
    return 'http://localhost:3000/teams'
}

function getWordContainer(){
    return document.getElementById('word-card-container');
}

function fetchWordArray(){
    fetch(wordURL())
        .then(response => response.json())
        .then(wordArray => populateCards(wordArray))
}

function fetchTeams(){
    fetch(teamURL())
        .then(response => response.json())
        .then(teams => teamArray = teams)
}