import baseUrl from '../data/baseurl.js';
import Detail from '../data/detail-data.js';
import Trailer from '../data/trailer-data.js';
import carousel from './_styles/carousel.js';
import errorValue from './_styles/error.js';

class CarouselList extends HTMLElement {
    
    set movies(movie){
        this._movie = movie;
        this.render();
    }

    render() {
        this.classList.add('carousel', 'slide', 'carousel-fade');
        this.setAttribute("data-ride","carousel");
        this.setAttribute("id", "popularSlide");

        const pageNumber = document.createElement("ol");
        pageNumber.classList.add('carousel-indicators');

        const popularItem = document.createElement("div");
        popularItem.classList.add('carousel-inner');

        for (let i=0; i < this._movie.length;i++){
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
                    <a href="#" class="button slide-component" id=${this._movie[i].id}>
                        <img src="${baseUrl.url_image}${this._movie[i].backdrop_path}" class="d-block w-100" alt="cover">
                        <div class="slide-item">
                            <h4 class="slide-title-item">${this._movie[i].title}</h4>
                            <div class="slide-des-item">
                                <p>${this._movie[i].overview}</p>
                            </div>
                            <p class="slide-det-item"><b>Release Date</b>  ${this._movie[i].release_date}</p>
                            <p class="slide-det-item"><b>Rate</b>  ${this._movie[i].vote_average}</p>
                            <p class="slide-det-item"><b>Popular</b>  ${this._movie[i].popularity}</p>  
                        </div>
                    </a>`;
            }

            popularItem.appendChild(item);
        }

        this.appendChild(pageNumber);
        this.appendChild(popularItem);
        this.innerHTML +=`
            <a class="carousel-control-prev" href="#popularSlide" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#popularSlide" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>`;
        this.innerHTML += `<style>${carousel}</style>`

        const nowItem = document.querySelector("nowplaying-item");
        const upcomingItem = document.querySelector("upcoming-item");
        const detailItem = document.querySelector("detail-item");
        const itemMovie = document.querySelectorAll(".slide-component");
        itemMovie.forEach(item => {
            item.addEventListener("click", event => {
                this.style.display = "none";
                nowItem.style.display = "none";
                upcomingItem.style.display = "none";
                detailItem.style.display = "block";
                
                const result = Detail.getDetail(event.currentTarget.id);
                const videos = Trailer.getTrailer(event.currentTarget.id);
                    result.then(item => {
                        videos.then(video =>{
                            detailItem.movie = {
                                data: item, 
                                trailer: video
                            };
                        });
                    });
            });
        });  
        
    }

    renderError(message){
        this.innerHTML = `${errorValue}<h2 class="placeholder">${message}</h2>`;
    }
}

customElements.define("carousel-list", CarouselList);