const comicsAPI='https://xkcd.com'
const comicjson='info.0.json'


async function fetchComic(comicNumber) {
    const urlPath=comicNumber!=undefined?
        comicsAPI+"/"+comicNumber+"/"+comicjson:
        comicsAPI+"/"+comicjson
    let res=await fetch(urlPath)
    let data=await res.json()
    console.log(data)
}
fetchComic()

//user profile form
const form = document.getElementById("form");
form.addEventListener("submit", formUpdateUI);

function formUpdateUI(event) {
  event.preventDefault();
  const formData = event.target;
  const nameDisplay = document.getElementById("usernameDisplay");
  const picDisplay = document.getElementById("profilePic");
  nameDisplay.innerText = formData.username.value;
  picDisplay.src = formData.profileURL.value;
}

//light/dark mode toggle aka flashbang yourself for fun
document.getElementById("modeToggle").addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}