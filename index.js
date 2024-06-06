const movieContainer = document.getElementById('movie-container')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const initialContent =  document.getElementById('initial-content')

const titlesArray = []
const searchedMovies = []
// const searchTitle = searchInput.value
searchBtn.addEventListener('click', function () {
    if (searchInput.value) {
       
      
        // console.log(searchInput.value);
        fetchMovies(searchInput.value)

        searchInput.value = ''
        // console.log(searchInput.value)


    }
    else {
        
        alert('type movie name');
    }

})


async function fetchMovies(searchText) {
    titlesArray.length = 0
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=ef53b83d&s=${searchText}`)
        // console.log(res)
        const data = await res.json()

        if (!res.ok) {

            console.error('movie not found')
            alert('movie not found');
            return
        }

        if (data.Response === 'false') {
            console.log('No movies found for the search query')

        }




        if (Array.isArray(data.Search)) {
            const searchResults = data.Search
            //  console.log(searchResults)
            searchResults.forEach(movie => {
                // console.log(typeof (movieTitles))
                titlesArray.push(movie.Title)

            })

        }
        else {
           
            alert('Unable to find what you’re looking for. Please try another search.') 
            console.error('unexpected error while fetching movie')
        }

    }
    catch (error) {
        console.error('error fetching movies', error)

    }

    //  console.log(data.Search[0])


    findMovie(titlesArray)


    //  console.log(titlesArray)


}






async function findMovie(searchItem) {
    // console.log('hi')

    searchedMovies.length = 0

    for (const item of searchItem) {
        const res = await fetch(`https://www.omdbapi.com/?apikey=ef53b83d&t=${item}&plot=short`)
        const data = await res.json()
        searchedMovies.push(data)

    }
    //  console.log(searchedMovies)

    renderMovies(searchedMovies)



}



async function renderMovies(movie) {
    console.log(movie)
     initialContent.style.display = 'none'
    let html = ``
    await movie.forEach(element => {
        //  console.log(element.Year)
        html += `<div class="movie">
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
                <i class="fa-solid fa-circle-plus"></i>
                <button class="watchlist-btn" data-add="${element.Title}">Watchlist</button>
            </span>

        </span>
        <p class="movie-description">${element.Plot}</p>
    </div>
    
    </div>`

    });

    movieContainer.innerHTML = html
}

document.addEventListener('click', (e) => {
    if (e.target.dataset.add) {
        console.log(e.target.dataset.add)
        handleWatchlistBtn(e.target.dataset.add)

    }
    // console.log(e)

})

function handleWatchlistBtn(movieTitle) {

    const TargetObj = searchedMovies.filter(movie => {
        return movie.Title === movieTitle
    })[0]
    addMoviesToLocalStorage('movie', TargetObj)
    // console.log(localStorage)

}

function addMoviesToLocalStorage(key, value) {
    let existingValue = JSON.parse(localStorage.getItem(key)) || [];

    const movieExists = existingValue.some(movie => movie.Title === value.Title);
    if (!movieExists) {
        // Add the new movie object to the array
        existingValue.push(value);
    }

    localStorage.setItem(key, JSON.stringify(existingValue))


}

