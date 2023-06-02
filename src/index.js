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

