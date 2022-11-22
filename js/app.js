'use strict';

import { UI } from './UI.js';
/////////////////////////////////////////////
/////----------- Separator -----------/////
/////////////////////////////////////////////
const searchBar = document.getElementById('search');
searchBar.value = '';

const intro = document.querySelector('.intro');
const notFound = document.querySelector('.not-found');

const getMovieArr = function (imdbIDArr) {
  const movieArr = [];

  imdbIDArr.forEach(async function (id) {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=5b41c8eb`);
    const movie = await response.json();
    movieArr.push(movie);
  });

  return movieArr;
};

const search = async function (val) {
  const response = await fetch(`https://www.omdbapi.com/?s=${val}&apikey=5b41c8eb`);
  const data = await response.json();

  if (data.Response !== 'True') {
    if (val.length > 3) {
      notFound.classList.remove('hidden');
    }
    setTimeout(() => (document.getElementById('movies--container').innerHTML = ''), 1001);
    return;
  }

  notFound.classList.add('hidden');
  const imdbIDArr = data.Search.map(item => item.imdbID);
  const movieArr = getMovieArr(imdbIDArr);

  UI.displayMovies(movieArr);
};

searchBar.addEventListener('input', function () {
  const searchVal = searchBar.value;
  document.getElementById('movies--container').innerHTML = '';

  if (!searchVal) {
    intro.classList.remove('hidden');
    notFound.classList.add('hidden');
    return;
  }
  intro.classList.add('hidden');

  search(searchVal);
});
