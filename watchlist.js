const watchlistContainer = document.getElementById('watchlist-container')
const EmptyWatchlistMsg = document.getElementById('initial-content')
// const selectedMovies = []
function getMoviesFromLocalStorage(key) {
    // selectedMovies.length = 0
    if (localStorage.getItem(key) !== null) {
        const selectedMovies = JSON.parse(localStorage.getItem(key))
        if (selectedMovies.length === 0) {
            EmptyWatchlistMsg.style.display = 'block'
            return []
        }
        else {
            renderMoviesInWatchlist(selectedMovies)
            return selectedMovies

        }
        // selectedMovies.forEach(movie => console.log(movie.Title))
        // console.log(selectedMovies)



    }
    else {
        EmptyWatchlistMsg.style.display = 'block'
        console.log('empty watchlist')
        return []
    }

}

async function renderMoviesInWatchlist(movieList) {
    // console.log(movieList)
    EmptyWatchlistMsg.style.display = 'none'
    let html = ``
    await movieList.map(element => {
        //  console.log(element.Year)
        html += `<div class="movie border">
     <div class="movie-image">
        <img src=${element.Poster}>
    </div>

    <div class="movie-details">
        <span>
            <p class="movie-title" >${element.Title}</p>
            <span>
                <!-- background: #FEC654; -->
                <i class="fa-solid fa-star"></i>
                <p class="movie-review">${element.imdbRating}</p>

            </span>
        </span>
        <span class="details">
            <p class="movie-duration">${element.Runtime}</p>
            <p class="movie-gener">${element.Genre}</p>
            <span class="add-to-watchlist">
            <i class="fa-solid fa-circle-minus"></i>
            <button class="remove-btn" data-remove="${element.Title}">remove</button>
            </span>

        </span>
        <p class="movie-description">${element.Plot}</p>
    </div>
    
    </div>`

    });

    watchlistContainer.innerHTML = html

}
getMoviesFromLocalStorage('movie')

document.addEventListener('click', e => {
    if (e.target.classList.contains('remove-btn')) {
        const movieTitle = e.target.dataset.remove
        removeMovieFromWatchlist(movieTitle)
    }
})


function removeMovieFromWatchlist(targetMovie) {
    let movies = getMoviesFromLocalStorage('movie')
    movies = movies.filter(movie => movie.Title !== targetMovie)
    localStorage.setItem('movie', JSON.stringify(movies))
    renderMoviesInWatchlist(movies)
  

}