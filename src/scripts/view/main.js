import '../component/detail-item.js';
import '../component/nowplaying-item.js';
import baseUrl from '../data/baseurl.js';
import Search from '../data/search-data.js';
import Popular from '../data/popular-data.js';
import Detail from '../data/detail-data.js';
import Movie from '../data/movie-data.js';

function main() {
    const listPopularElement = document.querySelector("#popularSlide");
    const listNowElement = document.querySelector("#nowplayingBar");
    const listUpcomingElement = document.querySelector("#upcomingBar");
    const searchElement = document.querySelector("#searchElement");
    // const detailElement = document.querySelector("#detailElement");
    
    const nowItem = document.querySelector("nowplaying-item");
    const detailItem = document.querySelector("detail-item");

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
                            <img src="${baseUrl.url_image}${results[i].backdrop_path}" class="d-block w-100" alt="cover">
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
                    getDetailData(event.currentTarget.id);
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
                        imageHolder = baseUrl.url_image + results[i].poster_path;
                    }else{
                        imageHolder = baseUrl.url_dummy;
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
                    getDetailData(event.currentTarget.id);
                });
            });
        }
    };

    const renderDetail = (results) =>{
        listPopularElement.style.display = "none";
        listNowElement.style.display = "none";
        listUpcomingElement.style.display = "none";
        searchElement.style.display = "none";

        detailItem.style.display = "block";
        detailItem.movie = results;
    }

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    const getPopularData = async () => {
        try{
            const result = await Popular.getPopular();
            renderPopular(result);
        } catch (message) {
            showResponseMessage(message);
        }
    };

    const getMovieData = async (query, element, title) => {
        try{
            const result = await Movie.getMovie(query);
            nowItem.movie = result;
        } catch (message) {
            showResponseMessage(message);
        }
    };

    const getDetailData = async (idMovie) => {
        try{
            const result = await Detail.getDetail(idMovie);
            renderDetail(result);
        } catch (message) {
            showResponseMessage(message);
        }
    }

    const onButtonSearchClicked = async (query) => {
        try{
            const result = await Search.getSearch(query);
            renderMovie(result, searchElement, `Search ${query}`);
        } catch (message) {
            showResponseMessage(message);
        }
    };

    document.addEventListener("DOMContentLoaded", () => {
        const inputSearch = document.querySelector("#inputSearch");
        const btnSearch = document.querySelector("#searchButtonElement");

        btnSearch.addEventListener("click", function (){
            listPopularElement.style.display = "none";
            listNowElement.style.display = "none";
            listUpcomingElement.style.display = "none";
            searchElement.style.display = "block";
            // detailElement.style.display = "none";
            searchElement.innerHTML ="";

            if (inputSearch.value != ""){
                onButtonSearchClicked(inputSearch.value);
            }else{
                onButtonSearchClicked('%20');
            }
            
        });

        getPopularData();
        getMovieData('now_playing');
        // getMovieData('upcoming', listUpcomingElement, 'Upcoming');
    });
    
}

export default main;