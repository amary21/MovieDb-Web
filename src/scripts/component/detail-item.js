import baseUrl from '../data/baseurl.js';

class DetailItem extends HTMLElement{

    set movie(movie){
        this._movie = movie
        this.render()
    }

    render() {
        this.innerHTML ="";
        let nGenres = [];
        let nCompanies = [];
        let nCountries = [];

        this._movie.genres.forEach(genre=>{
            nGenres.push(` ${genre.name}`);
        });

        this._movie.production_companies.forEach(companie =>{
            nCompanies.push(` ${companie.name}`);
        });

        this._movie.production_countries.forEach(country=>{
            nCountries.push(` ${country.name}`);
        });

        this.innerHTML = `
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
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
                
                .thumbnail{
                    height: 100%;
                    background: transparent;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                }
                
                .thumbnail h2{
                    position: static;
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 42px;
                    color: #0B37D3;
                    flex: none;
                    order: 0;
                    align-self: flex-start;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                .thumbnail p{
                    color: #E43F5A;
                    font-family: Roboto;
                    font-style: normal;
                }
                
                .thumbnail .item-body{
                    color: white;
                    font-size: 14px;
                }
                
                .item-overview{
                    margin-top: 16px;
                }
                .container-video{
                    position: relative;
                    width: 100%;
                    height: 0;
                    padding-bottom: 56.25%;
                }
                .container-video iframe{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                }
            </style>
            <div class="row">
                <div class="col-sm-6">
                    <div class="item-component">
                        <img src="${baseUrl.url_image}${this._movie.poster_path}" class="d-block w-100 img-fluid" alt="poster" >
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="thumbnail card">
                        <div class="card-body">
                            <h2>${this._movie.title}</h2>
                            <p><b>Genre</b></p>
                            <p class="item-body">${nGenres}</p>
                            <p><b>Original Title</b></p>
                            <p class="item-body">${this._movie.original_title}</p>
                            <p><b>Popularity</b></p>
                            <p class="item-body">${this._movie.popularity}</p>
                            <p><b>Production Companies</b></p>
                            <p class="item-body">${nCompanies}</p>
                            <p><b>Production Countries</b></p>
                            <p class="item-body">${nCountries}</p>
                            <p><b>Release Date</b></p>
                            <p class="item-body">${this._movie.release_date}</p>
                            <p><b>Rate</b></p>
                            <p class="item-body">${this._movie.vote_average}</p>
                        </div>
                    </div>
                </div>
                <div class="item-overview col-sm-12">
                    <div class="thumbnail card">
                        <div class="card-body">
                            <p><b>Overview</b></p>
                            <p class="item-body">${this._movie.overview}</p>
                        </div>
                    </div>
                </div>
                <div class="item-overview col-sm-12">
                    <div class="thumbnail card">
                        <div class="card-body">
                            <p><b>Trailer</b></p>
                            <div class="container-video">
                                <iframe frameborder="0" allowfullscreen src="https://www.youtube.com/embed/vOUVVDWdXbo"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
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

customElements.define("detail-item", DetailItem);