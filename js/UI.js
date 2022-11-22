export class UI {
  static displayMovies(movieArr) {
    let html = ``;

    document.querySelector('.spinner').classList.remove('hidden');

    setTimeout(function () {
      document.getElementById('movies--container').innerHTML = '';
      movieArr.forEach(function (movie) {
        document.querySelector('.spinner').classList.add('hidden');
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

      document.getElementById('movies--container').innerHTML = html;
    }, 1000);
  }
}
