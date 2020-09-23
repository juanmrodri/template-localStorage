// Variables
const listaTweets = document.querySelector('#lista-tweets');

// EventListeners

eventListeners();

function eventListeners() {
    // cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    // borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    // contenido cargado

    document.addEventListener('DOMContentLoaded', localStorageListo); // esto va a leer los elementos que se encuentren en el localstorage


}

    

// Funciones

// añadir tweets al formulario
function agregarTweet(e){
    e.preventDefault();
    console.log('formulario enviado correctamente!');
    // leer valor de textarea
    const tweet = document.querySelector('#tweet').value;

    // crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    //crear elemento y añadir el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    li.appendChild(botonBorrar);
    listaTweets.appendChild(li);

    // añadir a LocalStorage
    agregarTweetLocalStorage(tweet); // le pasamos de parametro el tweet, ya que queremos almacenar esa info

}

// borrar tweet del DOM

function borrarTweet(e) {
    e.preventDefault();
    if(e.target.className === 'borrar-tweet') {
        alert('Elemento eliminados');
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
        
    } 
}

// mostrar datos de local storage en la lista

function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    
    // agregamos un forEach para recorrer los datos, recordemos que estan en un array[]

    tweets.forEach(function(tweet){
        // crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    //crear elemento y añadir el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    li.appendChild(botonBorrar);
    listaTweets.appendChild(li);

    // añadir a LocalStorage
    agregarTweetLocalStorage(tweet); // le pasamos de parametro el tweet, ya que queremos almacenar esa info

    });
}

// agrega tweet a localStorage

function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    // añadir el nuevo  tweet
    tweets.push(tweet); // recodar que el push agrega un valor al final de un array

    // convertimos de String a array para localStorage

    localStorage.setItem('tweets', JSON.stringify(tweets)); // aca con Stringify convertimos el JSON en una string, ya que localStorage solo puede guardar strings
}

// comprobar que haya elementos en localStorage y retorna un array[]
function obtenerTweetsLocalStorage() {
    let tweets;
    // Revisamos los valores de localStorage
    if(localStorage.getItem('tweets') === null) {
        tweets = []; // lo que vamos a hacer es guardar la info que se almacena en el localstorage, en un array, esto es para que no se reescriba, y aca lo que le decimos es que si el valor tweets no tiene ningun dato, que inicie como un array vacio
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets')); // lo guardamos como un JSON
    }
    return tweets;
}

// borrar tweet de localStorage

function borrarTweetLocalStorage(tweet) {

    let tweets,
        tweetborrar; // esta var va a ser la que no tenga la X al final
        tweetborrar = tweet.substring(0, tweet.length - 1); //el substring nos permite cortar la string, y aca le decimos que vaya desde el caracter 0, hasta el ante ultimo, teniendo en cuenta lo que mida cada tweet, y le ponemos -1 por que la x esta al final

        // aca leemos los datos del localStorage
        tweets = obtenerTweetsLocalStorage();

        tweets.forEach(function(tweet, index){ // le pasamos de segundo parametro index, para saber la posicion actual del forEach
            if(tweetborrar === tweet){
                tweets.splice(index, 1); // recodar que el splice toma desde donde hasta donde queremos borrar, y de segundo parametro es cuantos elementos queremos borrar, en este caso solo uno
            }
        });


        localStorage.setItem('tweets', JSON.stringify(tweets));
}

