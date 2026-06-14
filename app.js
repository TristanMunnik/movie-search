const searchBtn = document.getElementById("searchBtn");

const searchInput = document.getElementById("searchInput");

const resultsDiv = document.getElementById("results");

searchBtn.addEventListener('click', function () {
    const searchTerm = searchInput.value;

    if(searchTerm === '') {
        alert("please enter a movie name");
        return;
    } 

    const apiKey = "bdc3f806";
    const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`;

    resultsDiv.innerHTML = '<p>Searching...</p>';

    fetch(url)
        .then(function (respone) {
            return respone.json();
        })
        .then(function(data) {

            resultsDiv.innerHTML = '';

            if(data.Response === 'False') {
                resultsDiv.innerHTML = '<p>No movies found</p>';
                return;
            }

            const movies = data.Search;

            movies.forEach(function(movie) {
                const movieCard = document.createElement('div');
                movieCard.className = 'movie-card';

                movieCard.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <h3>${movie.Title}</h3>
                    <p>${movie.Year}</p>
                `;
                resultsDiv.appendChild(movieCard);
            });

        })
        .catch(function(error) {
            console.log('Error: ', error);
        })

});