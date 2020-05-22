function main() {

    const baseUrl = "https://api.themoviedb.org/3";
    const baseUrlImage = "https://image.tmdb.org/t/p/original";
    const API_KEY = "ce3747f9814de0e3fc3292c9ef36fcdb";

    const getPopular = async (elementItem) => {
        try{
            const url = ''.concat(baseUrl, `/movie/popular?`, `api_key=${API_KEY}`);
            const response = await fetch(`${url}`);
            const responseJson = await response.json();
            if(responseJson.error){
                showResponseMessage(responseJson.message);
            }else{
                renderPopular(responseJson.results, elementItem);
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

    const renderPopular = (results, listPopularElement) => {
        if (listPopularElement != null){
            listPopularElement.classList.add('carousel', 'slide', 'carousel-fade');
            listPopularElement.setAttribute("data-ride","carousel");
    
            const pageNumber = document.createElement("ol");
            pageNumber.classList.add('carousel-indicators');
    
            const popularItem = document.createElement("div");
            popularItem.classList.add('carousel-inner');
    
            for (let i=0; i < 5;i++){
                const item = document.createElement("div");

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
                    <img src="${baseUrlImage}${results[i].backdrop_path}" class="d-block w-100" alt="cover">
                    <div class="slide-item">
                        <h4 class="slide-title-item">${results[i].title}</h4>
                        <div class="slide-des-item">
                            <p>${results[i].overview}</p>
                        </div>
                        <p class="slide-det-item"><b>Release Date</b>  ${results[i].release_date}</p>
                        <p class="slide-det-item"><b>Rate</b>  ${results[i].vote_average}</p>
                        <p class="slide-det-item"><b>Popular</b>  ${results[i].popularity}</p>  
                    </div>`;

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
            for (let i=0;i<4;i++){
                list.innerHTML += `
                <div class="item-movie col-lg-3 col-md-6 col-sm-12">
                    <div class="item-component">
                        <img src="${baseUrlImage}${results[i].poster_path}" class="d-block w-100" alt="poster">
                        <h4>${results[i].title}</h4>
                    </div>
                </div>`;
            }

            parentElement.appendChild(list);
        }
    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {
        const listPopularElement = document.querySelector("#popularSlide");
        const listNowElement = document.querySelector("#nowplayingBar");
        const listUpcomingElement = document.querySelector("#upcomingBar");
        const searchElement = document.querySelector("#searchElement");

        const inputSearch = document.querySelector("#inputSearch");
        const btnSearch = document.querySelector("#searchButtonElement");

        btnSearch.addEventListener("click", function (){
            const input = inputSearch.value;

            listPopularElement.style.display = "none";
            listNowElement.style.display = "none";
            listUpcomingElement.style.display = "none";
            searchElement.style.display = "block";
            searchElement.innerHTML ="";

            if (input != ""){
                getMovie(`/search/movie?query=${input}&`, searchElement, `Search ${input}`);
            }else{
                getMovie(`/search/movie?query=%20&`, searchElement, `Search ${input}`);    
            }
            
        });

        getPopular(listPopularElement);
        getMovie('/movie/now_playing?', listNowElement, 'Now Playing');
        getMovie('/movie/upcoming?', listUpcomingElement, 'Upcoming');
    });
}

export default main;