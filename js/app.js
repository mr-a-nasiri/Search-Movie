'use strict';
/////////////////////////////////////////////
/////----------- Separator -----------/////
/////////////////////////////////////////////

const getMovieArr = function (imdbIDArr) {
  const movieArr = [];

  imdbIDArr.forEach(async function (id) {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=5b41c8eb`);
    const movie = await response.json();
    movieArr.push(movie);
  });

  return movieArr;
};

const displayMovies = function (movieArr) {
  let html = ``;

  setTimeout(function () {
    movieArr.forEach(function (movie) {
      html += `
        <div class="movie">
          <img src=${movie.Poster} alt="${movie.Title}" class="movie-img" />
  
          <div class="movie-content">
            <span class="movie-title">${movie.Title}</span>
  
            <div class="movie-content-details">
              <span class="movie-duration">${movie.Runtime}</span>
              <span class="movie-genres">${movie.Genre}</span>
            </div>
  
            <button class="movie-to-watchlist" data-imdb-ID="${movie.imdbID}">
              <i class="fa-solid fa-circle-plus"></i>
              Watchlist
            </button>
  
            <p class="movie-summary">
              ${movie.Plot}
            </p>
  
          </div>
        </div>
      `;
    });

    console.log(html);
    document.getElementById('movies--container').innerHTML = html;
  }, 1000);
};

const search = async function () {
  const response = await fetch('https://www.omdbapi.com/?s=Fast&apikey=5b41c8eb');
  const data = await response.json();
  const imdbIDArr = data.Search.map(item => item.imdbID);
  const movieArr = getMovieArr(imdbIDArr);

  displayMovies(movieArr);
};

search();
