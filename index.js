const movieContainer = document.getElementById('movie-container')
const titlesArray = []

fetch('http://www.omdbapi.com/?apikey=ef53b83d&s=Blade+runner&plot=full')
    .then(res => res.json())
    .then(data => {
        //  console.log(data.Search[0])
        const searchResults = data.Search
        console.log(searchResults)
        searchResults.map(movie => {
            // console.log(typeof (movieTitles))
            titlesArray.push(movie.Title)

        })

        findMovie(titlesArray)
        //   console.log(result)
        //  renderMovies(result)
        //   

        // console.log(titlesArray)
    }
    )





async function findMovie(searchItem) {
    console.log('hi')
    const searchedMovies = []

    for (const item of searchItem) {
        const res = await fetch(`http://www.omdbapi.com/?apikey=ef53b83d&t=${item}&plot=short`)
        const data = await res.json()
        searchedMovies.push(data)

    }
    // console.log(searchedMovies)

    renderMovies(searchedMovies)



}



async function renderMovies(movie) {
    console.log(movie)
    let html = ``
   await movie.forEach(element => {
        // console.log(element.Year)
        html += `<div class="movie">
     <div class="movie-image">
        <img src=${element.Poster}>
    </div>

    <div class="movie-details">
        <span>
            <p class="movie-title">${element.Title}</p>
            <span>
                <!-- background: #FEC654; -->
                <i class="fa-solid fa-star"></i>
                <p class="movie-review">8.1</p>

            </span>
        </span>
        <span class="details">
            <p class="movie-duration">116min</p>
            <p class="movie-gener">Drama, Mystery, Sci-fi</p>
            <span class="add-to-watchlist">
                <i class="fa-solid fa-circle-plus"></i>
                <button class="watchlist-btn">Watchlist</button>
            </span>

        </span>
        <p class="movie-description">A blade runner must pursue and terminate four replicants who stole
            a ship in space, and have returned to Earth to find their creator.</p>
    </div
    
    </div>`

    });

    movieContainer.innerHTML = html




    

}



// movieContainer.innerHTML = findMovie(titlesArray)

