const comicsAPI='https://xkcd.com'
const comicjson='info.0.json'

const localDBAPI = 'http://localhost:3000/comics'
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
    displayCollection();
    loadComic(comicArray[0]);
  })

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
  likesDisplay.innerText = comic.likes;//TODO create in db

  if (comic.transcript !== ""){
    transcriptDisplay.innerText = comic.transcript.slice(0,120) + "...";//fits display perfectly
    //on my monitor...
  }
  else {transcriptDisplay.innerText = "no transcript for this comic";}

  const altDisplay = document.createElement("li");
  altDisplay.innerText = comic.alt;
  //TODO:
  //create metadata list when comic is loaded, attach
  //create element for each metadata item other than alt
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
  comic.likes++;
  //TODO persist with fetch
}