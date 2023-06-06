const localDBAPI = 'http://localhost:3000/comics'
const headers = {
  Accept: 'application/json',
  'Content-type': 'application/json',
}

let comicArray = [];
let currentComicID = 0;

function documentMap(name) {
  return document.getElementById(name);
}

//fetch from db.json locally
fetch(localDBAPI)
  .then(res => res.json())
  .then(data => {
    data.forEach(addToArray);
    comicArray.forEach(generateLikes);
    displayCollection();
    loadComic(comicArray[0]);
  })

//like generation
function generateLikes(comic) {
  comic.likes = Math.floor(Math.random()*20);
  //this means that the likes will be randomly overwritten every time we load the page
  //unsure if this is good or not
}

//user profile form
const form = documentMap("form");
form.addEventListener("submit", formUpdateUI);

function formUpdateUI(event) {
  event.preventDefault();
  const formData = event.target;
  const nameDisplay = documentMap("usernameDisplay");
  const picDisplay = documentMap("profilePic");
  nameDisplay.innerText = formData.username.value;
  picDisplay.src = formData.profileURL.value;
  form.reset();
}

//light/dark mode toggle aka flashbang yourself for fun
const toggleButton = documentMap("modeToggle");
toggleButton.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

//populate comic list either from db.json or api
function addToArray(comic) {
  comicArray.push(comic);
}

function displayCollection() {
  const comicCollection = documentMap("comicCollection");
  comicCollection.innerHTML = '';//erase previous (if any)
  comicArray.forEach(addComicToList);
}

function addComicToList(comic) {
  const comicCollection = documentMap("comicCollection");
  const comicListing = document.createElement("li");
  comicCollection.append(comicListing);
  comicListing.addEventListener("click", () => {loadComic(comic)});
  comicListing.innerText = comic.title;
}

//random access button
documentMap("random").addEventListener("click", getRandomComic);
function getRandomComic() {
  const randNum = Math.floor(Math.random()*(comicArray.length));
  loadComic(comicArray[randNum]);
}

//loads comic data to display at various parts of screen
function loadComic(comic) {
  const nameDisplay = documentMap("name");
  const imgDisplay = documentMap("imageDisplay");
  const metadataContainer = documentMap("metadata");
  const detailsDisplay = documentMap("comicDetails");
  const likesDisplay = documentMap("comicLikes");
  const transcriptDisplay = documentMap("comicTranscript");

  nameDisplay.innerText = comic.safe_title;
  imgDisplay.src = comic.img;
  detailsDisplay.innerText = `published ${comic.month}/${comic.year}`;
  likesDisplay.innerText = comic.likes;
  if (comic.transcript !== ""){
    transcriptDisplay.innerText = comic.transcript.slice(0,120) + "...";//fits display perfectly
    //on my monitor...
  }
  else {transcriptDisplay.innerText = "no transcript for this comic";}

  const altDisplay = document.createElement("li");
  altDisplay.innerText = comic.alt;
  //TODO: create metadata list when comic is loaded, attach
  //create element for each metadata item other than alt
  //metadata includes times loaded this session,
  //TODO think of more?
  metadataContainer.innerHTML = '';//erase previous list
  metadataContainer.append(altDisplay);
  currentComicID = comic.num;
}

//like button
//TODO add limiting functionality(cant like more than once per load?)
const likeButton = documentMap("likeButton");
likeButton.addEventListener("click", updateLikes);
function updateLikes(){
  const comic = comicArray.find(comic => comic.num === currentComicID);
  const index = comicArray.indexOf(comic) + 1;
  comic.likes++;
  documentMap("comicLikes").innerText = comic.likes;
  //post will look v similar
  fetch(`${localDBAPI}/${index}`, {
    headers,
    method: "PATCH",
    body: JSON.stringify({
      likes: comic.likes
    })
  })
  .then(res => res.json())
  .then(json => {
    console.log(json);
  })
}

//helper function to refresh each comic with likes added in the database
function populateDatabase() {
  //TODO post array?
}