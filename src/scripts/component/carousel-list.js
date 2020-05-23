import baseUrl from '../data/baseurl.js';
import Detail from '../data/detail-data.js';

class CarouselList extends HTMLElement {
    
    set movies(movie){
        this._movie = movie;
        this.render();
    }

    render() {
        console.log(this._movie)
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
        this.innerHTML +=`
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }

                .carousel-item{
                    height: 100%;
                }
                
                .carousel, .slide,
                .carousel .carousel-inner,
                .carousel .carousel-item,
                .carousel .carousel-item img,
                .carousel .carousel-control {
                border-radius: 20px;
                overflow: hidden;
                }
                
                .carousel-indicators li {
                    width: 15px;
                    height: 15px;
                    margin: 8px;
                    border-radius: 100%;
                }
                
                .carousel-item .slide-item{
                    flex-direction: column;
                    padding: 24px 16px;
                    position: absolute;
                    width: 30%;
                    height: 100%;
                    right: 0px;
                    top: 0px;
                    border-radius: 0px 20px 20px 0px;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(4px);
                }
                
                .slide-title-item{
                    position: static;
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 36px;
                    color: #0B37D3;
                    flex: none;
                    order: 0;
                    align-self: flex-start;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                .slide-des-item{
                    position: static;
                    padding-top: 16px;
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 14px;
                
                    color: #FFFFFF;
                
                    flex: none;
                    order: 1;
                    align-self: center;
                }
                
                .slide-des-item > p{
                    line-height: 25px;
                    height: 275px;
                    overflow: hidden;
                    position: relative;
                }
                
                .slide-des-item > p:after{
                    content: "...";
                    background: transparent;
                    position: absolute;
                }
                
                .slide-det-item{
                    position: static;
                    color: #FFFFFF;
                    font-family: Roboto;
                    font-size: 14px;
                    flex: none;
                    align-self: flex-start;
                }
            </style>
        `;

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
                result.then(item => {
                    detailItem.movie = item;
                });
            });
        });  
        
    }

    renderError(message){
        this.innerHTML = `
        <style>
             .placeholder {
                   font-weight: lighter;
                   color: rgba(0,0,0,0.5);
                   -webkit-user-select: none;
                   -moz-user-select: none;
                   -ms-user-select: none;
                   user-select: none;
               }
        </style>`;
        this.innerHTML += `<h2 class="placeholder">${message}</h2>`;
    }
}

customElements.define("carousel-list", CarouselList);