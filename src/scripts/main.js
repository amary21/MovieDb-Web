function main() {

    const baseUrl = "https://api.themoviedb.org/3/movie";
    const baseUrlImage = "https://image.tmdb.org/t/p/original";
    const API_KEY = "ce3747f9814de0e3fc3292c9ef36fcdb";

    const getPopular = async () => {
        try{
            const url = ''.concat(baseUrl, `/popular`, `?api_key=${API_KEY}`);
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

    const getNowplaying = async () => {
        try{
            const url = ''.concat(baseUrl, `/now_playing`, `?api_key=${API_KEY}`);
            const response = await fetch(`${url}`);
            const responseJson = await response.json();
            if(responseJson.error){
                showResponseMessage(responseJson.message);
            }else{
                renderNowplaying(responseJson.results);
            }
        } catch(error){
            showResponseMessage(error);
        }
    };

    const getUpcoming = async () => {
        try{
            const url = ''.concat(baseUrl, `/upcoming`, `?api_key=${API_KEY}`);
            const response = await fetch(`${url}`);
            const responseJson = await response.json();
            if(responseJson.error){
                showResponseMessage(responseJson.message);
            }else{
                renderUpcoming(responseJson.results);
            }
        } catch(error){
            showResponseMessage(error);
        }
    };

    const renderPopular = (results) => {
        const listPopularElement = document.querySelector("#popularSlide");
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

    const renderNowplaying = (results) => {
        const listNowElement = document.querySelector("#nowplayingBar");
        if (listNowElement != null){
            listNowElement.classList.add('item-bar');
            listNowElement.innerHTML += `
                <div class="title-item">
                    <p>Now Playing</p>
                </div>`;

            const listNow = document.createElement("div");
            listNow.classList.add('row');
            for (let i=0;i<4;i++){
                listNow.innerHTML += `
                <div class="item-movie col-lg-3 col-md-6 col-sm-12">
                    <div class="item-component">
                        <img src="${baseUrlImage}${results[i].poster_path}" class="d-block w-100" alt="poster">
                        <h4>${results[i].title}</h4>
                    </div>
                </div>`;
            }

            listNowElement.appendChild(listNow);
        }
    };

    const renderUpcoming = (results) => {
        const listNowElement = document.querySelector("#upcomingBar");
        if (listNowElement != null){
            listNowElement.classList.add('item-bar');
            listNowElement.innerHTML += `
                <div class="title-item">
                    <p>Now Playing</p>
                </div>`;
                
            const listNow = document.createElement("div");
            listNow.classList.add('row');
            for (let i=0;i<4;i++){
                listNow.innerHTML += `
                <div class="item-movie col-lg-3 col-md-6 col-sm-12">
                    <div class="item-component">
                        <img src="${baseUrlImage}${results[i].poster_path}" class="d-block w-100" alt="poster">
                        <h4>${results[i].title}</h4>
                    </div>
                </div>`;
            }

            listNowElement.appendChild(listNow);
        }
    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {

        // const inputBookId = document.querySelector("#inputBookId");
        // const inputBookTitle = document.querySelector("#inputBookTitle");
        // const inputBookAuthor = document.querySelector("#inputBookAuthor");
        // const buttonSave = document.querySelector("#buttonSave");
        // const buttonUpdate = document.querySelector("#buttonUpdate");

        // buttonSave.addEventListener("click", function () {
        //     const book = {
        //         id: Number.parseInt(inputBookId.value),
        //         title: inputBookTitle.value,
        //         author: inputBookAuthor.value
        //     };
        //     insertBook(book)
        // });

        // buttonUpdate.addEventListener("click", function () {
        //     const book = {
        //         id: Number.parseInt(inputBookId.value),
        //         title: inputBookTitle.value,
        //         author: inputBookAuthor.value
        //     };

        //     updateBook(book)
        // });

        getPopular();
        getNowplaying();
        getUpcoming();
    });
}

export default main;
