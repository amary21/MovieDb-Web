import baseUrl from '../data/baseurl.js';
import Detail from '../data/detail-data.js';

class UpcomingItem extends HTMLElement{

    set movie(movies){
        this._movie = movies
        this.render()
    }

    render() {
        this.classList.add('item-bar');
        this.innerHTML +=`
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }
                
                .item-bar{
                    position: static;
                    width: 100%;
                    background: #162447;
                    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
                    border-radius: 20px;
                    flex: none;
                    order: 1;
                    align-self: flex-start;
                    margin-top: 16px;
                    padding: 16px 16px 0px 16px;
                }
                
                .title-item{
                    position: static;
                }
                
                .title-item > p{
                    position: relative;
                    padding: 8px 16px 8px 16px;
                    color: #FFFFFF;
                    background: #E43F5A;
                    font-family: Roboto;
                    font-style: normal;
                    text-align: center;
                    font-weight: bold;
                    max-width: 200px;
                    font-size: 18px;
                    line-height: 21px;
                    border-radius: 20px;
                
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                .item-movie{
                    position: static;
                }
                
                .item-movie > a.button{
                    text-decoration: none;
                }
                
                .item-movie .item-component{
                    border-radius: 10px;
                    margin-bottom: 16px;
                    padding-bottom: 4px;
                    background: rgba(0, 0, 0, 0.7);
                }
                
                .item-component > img {
                    border-radius: 10px;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                    
                }
                
                .item-component > h5{
                    font-family: Roboto;
                    text-align: center;
                    color: #FFFFFF;
                    padding: 4px 8px 0px 8px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            </style>
            <div class="title-item">
                <p>Upcoming</p>
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
            const nowItem = document.querySelector("nowplaying-item");
            const detailItem = document.querySelector("detail-item");
            const itemMovie = document.querySelectorAll(".item-component");
            itemMovie.forEach(item => {
                item.addEventListener("click", event => {
                    this.style.display = "none";
                    carouselItem.style.display = "none";
                    nowItem.style.display = "none";
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

customElements.define("upcoming-item", UpcomingItem);