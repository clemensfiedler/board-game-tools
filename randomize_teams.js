var names = []
var nTeams = 2
var nTeams_max = 5
var nTeams_min = 1

var remove = false

function addName() {

  newName = fieldName.value
  if (newName == "") {
    //if the submitted name is empty just add `Player n`
    newName = `player ${names.length+1}`
  }

  names.push([newName, 0])
  fieldName.value = ""

  randomizeTeams(names, nTeams)
  drawNames(names)

}

function changeTeams(step) {
  nTeams = Math.max(nTeams_min, Math.min(nTeams_max, nTeams+step))

  //update display
  teamContainer.innerHTML = `${nTeams} teams`
  randomizeTeams()

}

function changeRemoveMode() {
  remove = !remove

  buttonRemovePlayer.setAttribute("active", remove);
}

function removeName(item) {

  if (remove) {
    idx = parseInt(item.id)
    console.log(item.id)

    namesLeft = names.slice(0, idx)
    namesRight = names.slice(idx+1)

    names = namesLeft.concat(namesRight)
    randomizeTeams()
  }

}

function resetNames() {
  // reset names
  names = []
  drawNames(names)

  // reset team sizes
  nTeams = 2
  teamContainer.innerHTML = `${nTeams} teams`
}

function randomizeOrder() {
  //shuffle names to new order
  names = shuffle(names)
  drawNames(names)
}

function randomizeTeams() {

  names = shuffle(names)

  //get the number of players per team
  playersPerTeam = Math.floor(names.length/nTeams)
  residual =  names.length%nTeams

  //define current team and count of players
  teamID = 1
  teamCount = 0

  //assign players to teams
  for (nm of names) {
    nm[1] = teamID
    teamCount ++

    // test if we need to switch to next team
    if (teamCount >= playersPerTeam + (residual>0)) {
      teamCount = 0
      teamID ++
      residual --
    }
  }
  drawNames(names)
}


function drawNames(names) {

  var outstring = ""
  var id = 0
  for (nm of names) {
    entry = `<div class="name" onclick="removeName(this)" team=${nm[1]} id=${id}>${nm[0]} </div>\n`
    outstring = outstring.concat(entry)
    id ++
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

  return array_out;
}


// define containers
const fieldName = document.getElementById('fname')
const namesContainer = document.getElementById('names-container')
const teamContainer = document.getElementById('nTeams')
const buttonRemovePlayer = document.getElementById('removePlayer')

// add listerners
document.getElementById("fname").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    addName()
  }
});
