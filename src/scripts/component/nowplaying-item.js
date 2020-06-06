import baseUrl from '../data/baseurl.js';
import Detail from '../data/detail-data.js';
import Trailer from '../data/trailer-data.js';
import movieItem from '../component/styles/movie-item.js';
import errorValue from '../component/styles/error.js';

class NowplayingItem extends HTMLElement{

    set movie(movies){
        this._movie = movies
        this.render()
    }

    render() {
        this.classList.add('item-bar');
        this.innerHTML +=`
            <style>${movieItem}</style>
            <div class="title-item">
                <p>Now Playing</p>
            </div>`;
            
        const list = document.createElement("div");
        list.classList.add('row');
        for(let i = 0;i < this._movie.length;i++){
                let imageHolder = "";
                if(i >= 6){
                    break;
                }else {
                    if (this._movie[i].poster_path != null){
                        imageHolder = baseUrl.url_image + this._movie[i].poster_path;
                    }else{
                        imageHolder = baseUrl.url_dummy;
                    }

                    list.innerHTML += `
                    <div class="item-movie col-lg-2 col-md-4 col-sm-6">
                        <a href="#" class="button">
                            <div class="item-component" id="${this._movie[i].id}">
                                <img src="${imageHolder}" class="d-block w-100 img-fluid" alt="poster">
                                <h5>${this._movie[i].title}</h5>
                            </div>
                        </a>
                    </div>`;
                }

                this.appendChild(list);
            }

            const carouselItem = document.querySelector("carousel-list");
            const upcomingItem = document.querySelector("upcoming-item");
            const detailItem = document.querySelector("detail-item");
            const itemMovie = document.querySelectorAll(".item-component");
            itemMovie.forEach(item => {
                item.addEventListener("click", event => {
                    this.style.display = "none";
                    carouselItem.style.display = "none";
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

customElements.define("nowplaying-item", NowplayingItem);