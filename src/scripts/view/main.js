import '../component/detail-item.js';
import '../component/nowplaying-item.js';
import '../component/upcoming-item.js';
import '../component/search-item.js';
import '../component/carousel-list.js';
import baseUrl from '../data/baseurl.js';
import Search from '../data/search-data.js';
import Popular from '../data/popular-data.js';
import Detail from '../data/detail-data.js';
import Movie from '../data/movie-data.js';

function main() {
    const carouselItem = document.querySelector("carousel-list");
    const nowItem = document.querySelector("nowplaying-item");
    const upcomingItem = document.querySelector("upcoming-item");
    const detailItem = document.querySelector("detail-item");
    const searchItem = document.querySelector("search-item");

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    const getPopularData = async () => {
        try{
            const result = await Popular.getPopular();
            carouselItem.movies = result;
        } catch (message) {
            showResponseMessage(message);
        }
    };

    const getMovieData = async (query) => {
        try{
            const result = await Movie.getMovie(query);
            if(query == "now_playing"){    
                nowItem.movie = result;   
            }else{
                upcomingItem.movie = result;
            }
        } catch (message) {
            showResponseMessage(message);
        }
    };

    const onButtonSearchClicked = async (query) => {
        try{
            const result = await Search.getSearch(query);
            searchItem.movie = result;
        } catch (message) {
            showResponseMessage(message);
        }
    };

    document.addEventListener("DOMContentLoaded", () => {
        const inputSearch = document.querySelector("#inputSearch");
        const btnSearch = document.querySelector("#searchButtonElement");

        btnSearch.addEventListener("click", function (){
            carouselItem.style.display = "none";
            nowItem.style.display = "none";
            upcomingItem.style.display = "none";
            searchItem.style.display = "block";
            detailItem.style.display = "none";
            searchItem.innerHTML ="";

            if (inputSearch.value != ""){
                onButtonSearchClicked(inputSearch.value);
            }else{
                onButtonSearchClicked('%20');
            }
            
        });

        getPopularData();
        getMovieData('now_playing');
        getMovieData('upcoming');
    });
    
}

export default main;