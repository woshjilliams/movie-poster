var form = document.querySelector('form');
var input = document.querySelector('.search');
var searchResults = document.querySelector('.movies');
var poster = document.querySelector('.poster');
var noPosterfound = document.querySelector('.no-poster');

form.addEventListener('submit',getMovies);

function resetView (element) {
	element.textContent = '';
	noPosterfound.style.display = 'none';
	poster.style.display = 'none';
}

function getMovies(event) {
	event.preventDefault();
	console.log(input.value);
	var search = input.value;
	var searchUrl = "http://www.omdbapi.com/?s=" + search;
	fewd.getJSON(searchUrl, listMovies);
};

function createMovie(title, imdbID) {
	//create all your elements
	var li = document.createElement("li");
	var a = document.createElement("a")
	//bedazzlement stage - add 
	a.textContent = title;
	a.setAttribute("href", '#' + imdbID);
	a.setAttribute("id", imdbID);
	a.setAttribute("title", title);
	a.addEventListener('click', getPoster);
	// 3. append your new elements stage  - stick them back in the DOM
	searchResults.appendChild(li); 
	li.appendChild(a);

}

function listMovies(json) {
	//clear view 
	resetView(searchResults);

	// unpack
	var movies = json["Search"];
	console.log(json);
	// check if there are any results
	if (movies) {
		// 2. Loop over the array over movies
		movies.forEach(function(movie){
			createMovie(movie["Title"], movie["imdbID"]);
		});	
	} else {
		searchResults.textContent = 'No search results';
	}
};

function noPoster (){
	noPosterfound.style.display = 'block';
	poster.style.display = 'none';
}

function posterFound () {
	noPosterfound.style.display = 'none';
	poster.style.display = 'block';
}

function getPoster (event) {
	event.preventDefault();
	var movieId = event.target.getAttribute('id');
	var searchByIdUrl = "http://www.omdbapi.com/?i=" + movieId;
	fewd.getJSON(searchByIdUrl, updatePoster)
}

function updatePoster (json) {
 // 1. unpack
 // 2. update page (try not to create new element)
 	var posterUrl = json["Poster"];

 	if (posterUrl != 'N/A') {
 		posterFound();
 		poster.setAttribute("src", "");
 		poster.setAttribute("src",posterUrl);
 	} else {
 		noPoster();
 	}
 }
