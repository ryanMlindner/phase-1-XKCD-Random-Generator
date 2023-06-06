const comicsAPI='http://localhost:3000/comics'

// const comiclikes=document.getElementById('comicLikes')

fetch(comicsAPI)
    .then(res => res.json())
    .then(comicName)





function comicName(comic) {
    const comicTile=document.getElementById('name')
    comicTile.textContent=comic.title
}
console.log(comic)
function comicDetail(comic) {
    const comicDetails=document.getElementById('comicDetails')
    comicDetails.textContent=comic.year.month
    comiclikes.textContent=comic.likes
    const comicAlt=document.getElementById('comicAlt')
    comicAlt.alt=comic.alt
}