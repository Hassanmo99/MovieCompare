const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? " " : movie.Poster;
    return `
    <img src="${imgSrc}"/>
    ${movie.Title} (${movie.Year})
    `;
  },
  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchTerm) {
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        apikey: "e2a9f767",
        s: searchTerm,
      },
    });
    if (response.data.Error) return [];
    return response.data.Search;
  },
};
createAutoComplete({
  ...autoCompleteConfig, // take all the properties inside the config object and bring it here
  root: document.querySelector("#left-autocomplete"), // where to render
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie,document.querySelector("#left-summary"),"left");
  },
});
createAutoComplete({
  ...autoCompleteConfig, // take all the properties inside the config object and bring it here
  root: document.querySelector("#right-autocomplete"), // where to render
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#right-summary"),"right");
  },
});

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie,summaryElement,side) => {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "e2a9f767",
      i: movie.imdbID,
    },
  });
  summaryElement.innerHTML = movieTemplate(response.data)
  if (side === 'left')
    leftMovie = response.data;
  else
    rightMovie = response.data;
  if (leftMovie && rightMovie) {
    runComparison();
  }
};
const runComparison = () => {
  const leftSideStats = document.querySelectorAll("#left-summary .notification");
  const rightSideState= document.querySelectorAll('#right-summary .notification')
    
  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideState[index]
    
    const leftSideValue = leftStat.dataset.value;
    const rightSideValue = rightStat.dataset.value;
    console.log(leftSideValue,rightSideValue);

    
    if (rightSideValue > leftSideValue) {
      leftStat.classList.remove('is-primary')
      leftStat.classList.add('is-warning')
    } else {
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
    }
   
  })
  }
const movieTemplate = (movieDetails) => {
  const dollars = parseInt(
    movieDetails.BoxOffice.replace(/\$/g, "").replace(/,/g, '')
  );
  const metascore = parseInt(movieDetails.Metascore);
  const imdbRating = parseFloat(movieDetails.imdbRating);
  const imdbVotes = parseInt(movieDetails.imdbVotes.replace(/,/g, ""));
  
  const awards = movieDetails.Awards.split(' ').reduce((prev, word) => {
    
   
  const value = parseInt(word);
   if (isNaN(value)) {
     return prev;
   } else {
     return prev + value;
  }
}, 0);

  
 
  
    
  return `
     <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetails.Poster}"/>
        </p>
      </figure>
       <div class="content">
          <h1>${movieDetails.Title}</h1>
          <h4>${movieDetails.Genre}</h4>
          <p>${movieDetails.Plot}</p>
       </div>
     </article>
     <article data-value=${awards} class="notification is-primary">
     <p class="title">${movieDetails.Awards}</p>
     <p class="subtitle">Awards</p>
     </article>
     <article data-value=${dollars} class="notification is-primary">
     <p class="title">${movieDetails.BoxOffice}</p>
     <p class="subtitle">Box Office</p>
     </article>
     <article data-value=${metascore} class="notification is-primary">
     <p class="title">${movieDetails.Metascore}</p>
     <p class="subtitle">Metascore</p>
     </article>
     <article data-value=${imdbRating} class="notification is-primary">
     <p class="title">${movieDetails.imdbRating}</p>
     <p class="subtitle">IMDB Rating</p>
     </article>
     <article data-value=${imdbVotes} class="notification is-primary">
     <p class="title">${movieDetails.imdbVotes}</p>
     <p class="subtitle">IMDB Votes</p>
     </article>
  `;
};
