function main() {
    const listPopularElement = document.querySelector("#popularSlide");
    const listNowElement = document.querySelector("#nowplayingBar");
    const listUpcomingElement = document.querySelector("#upcomingBar");
    const searchElement = document.querySelector("#searchElement");
    const detailElement = document.querySelector("#detailElement");

    const baseUrl = "https://api.themoviedb.org/3";
    const baseUrlImage = "https://image.tmdb.org/t/p/original";
    const API_KEY = "ce3747f9814de0e3fc3292c9ef36fcdb";
    const imgDummy = "https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png";

    const getPopular = async () => {
        try{
            const url = ''.concat(baseUrl, `/movie/popular?`, `api_key=${API_KEY}`);
            const response = await fetch(`${url}`);
            const responseJson = await response.json();
            if(responseJson.error){
                showResponseMessage(responseJson.message);
            }else{
                renderPopular(responseJson.results);
            }
        } catch(error){
            showResponseMessage(error);
        }
    };

    const getMovie = async (query, elementItem, title) => {
        try{
            const url = ''.concat(baseUrl, `${query}`, `api_key=${API_KEY}`);
            const response = await fetch(`${url}`);
            const responseJson = await response.json();
            if(responseJson.error){
                showResponseMessage(responseJson.message);
            }else{
                renderMovie(responseJson.results, elementItem, title);
            }
        } catch(error){
            showResponseMessage(error);
        }
    };

    const getDetail = async(idMovie) =>{
        try{
            const url = ''.concat(baseUrl, `/movie/${idMovie}?`, `api_key=${API_KEY}`);
            const response = await fetch(`${url}`);
            const responseJson = await response.json();
            if(responseJson.error){
                showResponseMessage(responseJson.message);
            }else{
                renderDetail(responseJson);
            }
        } catch(error){
            showResponseMessage(error);
        }
    }

    const renderPopular = (results) => {
        if (listPopularElement != null){
            listPopularElement.classList.add('carousel', 'slide', 'carousel-fade');
            listPopularElement.setAttribute("data-ride","carousel");
    
            const pageNumber = document.createElement("ol");
            pageNumber.classList.add('carousel-indicators');
    
            const popularItem = document.createElement("div");
            popularItem.classList.add('carousel-inner');
    
            for (let i=0; i < results.length;i++){
                const item = document.createElement("div");
                if(i >= 5){
                    break;
                }else {
                    if (i == 0){
                        pageNumber.innerHTML +=`
                            <li data-target="#popularSlide" data-slide-to=${i} class="active"></li>`;
                        item.classList.add('carousel-item', 'active');
                    }else{
                        pageNumber.innerHTML +=`
                            <li data-target="#popularSlide" data-slide-to=${i}></li>`;
                        item.classList.add('carousel-item');
                    }

                    item.innerHTML += `
                        <a href="#" class="button slide-component" id=${results[i].id}>
                            <img src="${baseUrlImage}${results[i].backdrop_path}" class="d-block w-100" alt="cover">
                            <div class="slide-item">
                                <h4 class="slide-title-item">${results[i].title}</h4>
                                <div class="slide-des-item">
                                    <p>${results[i].overview}</p>
                                </div>
                                <p class="slide-det-item"><b>Release Date</b>  ${results[i].release_date}</p>
                                <p class="slide-det-item"><b>Rate</b>  ${results[i].vote_average}</p>
                                <p class="slide-det-item"><b>Popular</b>  ${results[i].popularity}</p>  
                            </div>
                        </a>`;
                }

                popularItem.appendChild(item);
            }

            listPopularElement.appendChild(pageNumber);
            listPopularElement.appendChild(popularItem);
            listPopularElement.innerHTML +=`
                <a class="carousel-control-prev" href="#popularSlide" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#popularSlide" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>`;

            const itemMovie = document.querySelectorAll(".slide-component");
            itemMovie.forEach(item => {
                item.addEventListener("click", event => {
                    console.log(event.currentTarget.id);
                    getDetail(event.currentTarget.id);
                });
            });
        }

    };

    const renderMovie = (results, parentElement, title) => {
        if (parentElement != null){
            parentElement.classList.add('item-bar');
            parentElement.innerHTML += `
                <div class="title-item">
                    <p>${title}</p>
                </div>`;

            const list = document.createElement("div");
            list.classList.add('row');
            for(let i = 0;i < results.length;i++){
                let imageHolder = "";
                if(i >= 6){
                    break;
                }else {
                    if (results[i].poster_path != null){
                        imageHolder = baseUrlImage + results[i].poster_path;
                    }else{
                        imageHolder = imgDummy;
                    }

                    list.innerHTML += `
                    <div class="item-movie col-lg-2 col-md-4 col-sm-6">
                        <a href="#" class="button">
                            <div class="item-component" id="${results[i].id}">
                                <img src="${imageHolder}" class="d-block w-100 img-fluid" alt="poster">
                                <h5>${results[i].title}</h5>
                            </div>
                        </a>
                    </div>`;
                }

                parentElement.appendChild(list);
            }

            const itemMovie = document.querySelectorAll(".item-component");
            itemMovie.forEach(item => {
                item.addEventListener("click", event => {
                    getDetail(event.currentTarget.id);
                });
            });
        }
    };

    const renderDetail = (results) =>{
        detailElement.innerHTML = "";
        console.log(results.id);
        listPopularElement.style.display = "none";
        listNowElement.style.display = "none";
        listUpcomingElement.style.display = "none";
        searchElement.style.display = "none";
        detailElement.style.display = "block";

        let nGenres = [];
        let nCompanies = [];
        let nCountries = [];

        results.genres.forEach(genre=>{
            nGenres.push(` ${genre.name}`);
        });

        results.production_companies.forEach(companie =>{
            nCompanies.push(` ${companie.name}`);
        });

        results.production_countries.forEach(country=>{
            nCountries.push(` ${country.name}`);
        });

        detailElement.innerHTML += `
            <div class="row">
                <div class="col-sm-6">
                    <div class="item-component">
                        <img src="${baseUrlImage}${results.poster_path}" class="d-block w-100 img-fluid" alt="poster" >
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="thumbnail card">
                        <div class="card-body">
                            <h2>${results.title}</h2>
                            <p><b>Genre</b></p>
                            <p class="item-body">${nGenres}</p>
                            <p><b>Original Title</b></p>
                            <p class="item-body">${results.original_title}</p>
                            <p><b>Popularity</b></p>
                            <p class="item-body">${results.popularity}</p>
                            <p><b>Production Companies</b></p>
                            <p class="item-body">${nCompanies}</p>
                            <p><b>Production Countries</b></p>
                            <p class="item-body">${nCountries}</p>
                            <p><b>Release Date</b></p>
                            <p class="item-body">${results.release_date}</p>
                            <p><b>Rate</b></p>
                            <p class="item-body">${results.vote_average}</p>
                        </div>
                    </div>
                </div>
                <div class="item-overview col-sm-12">
                    <div class="thumbnail card">
                        <div class="card-body">
                            <p><b>Overview</b></p>
                            <p class="item-body">${results.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {
        const inputSearch = document.querySelector("#inputSearch");
        const btnSearch = document.querySelector("#searchButtonElement");

        btnSearch.addEventListener("click", function (){
            const input = inputSearch.value;

            listPopularElement.style.display = "none";
            listNowElement.style.display = "none";
            listUpcomingElement.style.display = "none";
            searchElement.style.display = "block";
            detailElement.style.display = "none";
            searchElement.innerHTML ="";

            if (input != ""){
                getMovie(`/search/movie?query=${input}&`, searchElement, `Search ${input}`);
            }else{
                getMovie(`/search/movie?query=%20&`, searchElement, `Search ${input}`);    
            }
            
        });

        getPopular();
        getMovie('/movie/now_playing?', listNowElement, 'Now Playing');
        getMovie('/movie/upcoming?', listUpcomingElement, 'Upcoming');
    });
}

export default main;