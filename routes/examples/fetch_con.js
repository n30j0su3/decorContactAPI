//this part is for the frontend 
//https://cursos.mejorcodigo.net/article/el-fetch-api-en-javascript-43
//http://www.etnassoft.com/2016/10/10/estudiando-la-nueva-api-fetch-la-evolucion-natural-de-xhr-en-el-nuevo-javascript/

//Fetch al API
var headers = new Headers();
headers.append("X-RapidAPI-Host", "deezerdevs-deezer.p.rapidapi.com");
headers.append("X-RapidAPI-Key", "e28ad5c50dmsh44c3cb29ce67af5p10614ejsn75d41ea6a56d");

var opciones = {
    method: 'GET',
    headers: headers,
    mode: 'cors',
    cache: 'default'
};

fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${storage.getItem("artist")}`, opciones)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        const data = json.data;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            var { title_short: name, artist, album, preview: file } = data[i]
            songs.push( new Song(name,artist.name,album.cover_big,file) );
        }
        let player = document.querySelector("#player");
        player.classList.remove("placeholder");
        ap.loadSong();
    })