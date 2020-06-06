import baseUrl from '../data/baseurl.js';
import detail from './_styles/detail.js';
import errorValue from './_styles/error.js';

class DetailItem extends HTMLElement{

    set movie(movie){
        this._movie = movie.data;
        this._video = movie.trailer[0].key;
        this.render();
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
            <style>${detail}</style>
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
                                <iframe frameborder="0" allowfullscreen src="${baseUrl.url_video}${this._video}"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
    }

    renderError(message){
        this.innerHTML = `${errorValue}<h2 class="placeholder">${message}</h2>`;
    }
}

customElements.define("detail-item", DetailItem);