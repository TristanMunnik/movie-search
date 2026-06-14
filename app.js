const searchBtn = document.getElementById("searchBtn");

const searchInput = document.getElementById("searchInput");

const resultsDiv = document.getElementById("results");

searchBtn.addEventListener('click', function() {
    searchMovies();
});

searchInput.addEventListener('keypress', function(event) {
    if(event.key === "Enter") {
        searchMovies();
    }
});

function searchMovies() {
    const searchTerm = searchInput.value;

    if(searchTerm === '') {
        alert("Please enter a movie name");
    }

    resultsDiv.innerHTML = "<p>Searching...</p>";

    const apiKey = "bdc3f806";
    const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`;

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            resultsDiv.innerHTML = '';

            if(data.Response === 'False') {
                resultsDiv.innerHTML = '<p>No movies found</p>';
                return;
            }

            const movies = data.Search;

            movies.forEach(function(movie){
                const movieCard = document.createElement('div');
                movieCard.className = 'movie-card';

                movieCard.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <h3>${movie.Title}</h3>
                    <p>${movie.Year}</p>
                `;

                resultsDiv.appendChild(movieCard);

            })
            .catch(function(error) {
                console.log('error: ' , error);
            })

        })

}