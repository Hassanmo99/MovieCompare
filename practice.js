// const onMovieSelect = async (movie) => {
//   const movieDetails = await axios.get("http://www.omdbapi.com/", {
//     params: {
//       apikey: "e2a9f767",
//       i: movie.imdbID,
//     },
//   });
//   document.querySelector("#summary").innerHTML = movieTemplate(
//     movieDetails.data
//   );
// };

// const movieTemplate = (movieDetails) => {
//   return `
//     <article class="media" >
//       <figure class="media-left">
//         <p class="image">
//           <img src="${movieDetails.Poster}">
//         </p>
//       </figure>
//       <div class="media-content">
//         <div class="content">
//           <h1>${movieDetails.Title}</h1>
//           <h4>${movieDetails.Genre}</h4>
//           <p>${movieDetails.Plot}</p>
//         </div>
//       </div>
//     </article>
//     <article class="notification is-primary">
//       <p class="title">${movieDetails.Awards}</p>
//       <p class="subtitle">Awards</p>
//     </article>
//        </article>
//     <article class="notification is-primary">
//       <p class="title">${movieDetails.BoxOffice}</p>
//       <p class="subtitle">Box Office</p>
//     </article>
//        </article>
//     <article class="notification is-primary">
//       <p class="title">${movieDetails.Metascore}</p>
//       <p class="subtitle">Metascore</p>
//     </article>
//        </article>
//     <article class="notification is-primary">
//       <p class="title">${movieDetails.imdbRating}</p>
//       <p class="subtitle">IMDB Rating</p>
//     </article>
//        </article>
//     <article class="notification is-primary">
//       <p class="title">${movieDetails.imdbVotes}</p>
//       <p class="subtitle">IMDB Votes</p>
//     </article>
//   `;
// };

// async function fetchData(searchTerm) {
//   const response = await axios.get("http://www.omdbapi.com/", {
//     params: {
//       apikey: "e2a9f767",
//       s: searchTerm,
//     },
//   });
//   if (response.data.Error) return [];
//   return response.data.Search;
// }

// const root = document.querySelector(".autocomplete");
// const input = document.querySelector("input");
// const dropdown = document.querySelector(".dropdown");
// const resultWrapper = document.querySelector(".results");
// const showMovie = document.querySelector(".show-movie");

// root.innerHTML = `
// <label><b>Search for a movie</b></label>
// <input class="input">
// <div class="dropdown">
// <div class="dropdown-menu">
// <div class="dropdown-content results"></div>
// </div>
// </div>
// `;

// const onInput = async (e) => {
//   const movies = await fetchData(e.target.value);
//   if (!movies.length) {
//     // to close dropdown menu
//     dropdown.classList.remove("is-active");
//     return;
//   }

//   resultWrapper.innerHTML = "";
//   dropdown.classList.add("is-active");

//   for (let movie of movies) {
//     const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
//     const option = document.createElement("a");
//     option.classList.add("dropdown-item");
//     option.innerHTML = `
//     <img src= "${imgSrc}">
//     ${movie.Title}
//     `;
//     //showing movie details
//     option.addEventListener("click", async (e) => {
//       dropdown.classList.remove("is-active");
//       input.value = movie.Title;

//       onMovieSelect(movie);
//     });
//     resultWrapper.appendChild(option);
//   }
// };

// // closing dropdown
// document.addEventListener("click", (e) => {
//   if (!root.contains(e.target)) dropdown.classList.remove("is-active");
// });

// input.addEventListener("input", debounce(onInput, 500));
