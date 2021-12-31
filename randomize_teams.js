var names = []
var nTeams = 2

function addName() {

  newName = fieldName.value
  if (newName == "") {
    //if the submitted name is empty just add `Player n`
    newName = `player ${names.length+1}`
  }

  names.push([newName, 0])
  fieldName.value = ""
  drawNames(names)
}

function resetNames() {
  names = []
  drawNames(names)
}

function drawNames(names) {

  //shuffle names to new order
  shuffledNames = shuffle(names)

  var outstring = ""
  for (nm of shuffledNames) {
    entry = `<div class="name" team=${nm[1]}>${nm[0]}</div>\n`
    outstring = outstring.concat(entry)
  }

  namesContainer.innerHTML = outstring

}

function shuffle(array_in) {
  let currentIndex = array_in.length, randomIndex;

  var array_out = [...array_in];

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array_out[currentIndex], array_out[randomIndex]] = [
      array_out[randomIndex], array_out[currentIndex]];
  }

  return randomizeTeams(array_out, nTeams);
}

function randomizeTeams(array_in, nTeams) {

  //get the number of players per team
  playersPerTeam = Math.floor(array_in.length/nTeams)

  //define current team and count of players
  teamID = 1
  teamCount = 0

  //assign players to teams
  for (nm of array_in) {
    nm[1] = teamID
    teamCount ++
    if (teamCount>=playersPerTeam) {
      teamCount = 0
      teamID ++
    }
  }
  return array_in
}


// define containers
const fieldName = document.getElementById('fname')
const namesContainer = document.getElementById('names-container')

// add listerners
document.getElementById("fname").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    addName()
  }
});
