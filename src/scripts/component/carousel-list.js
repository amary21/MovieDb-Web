class CarouselList extends HTMLElement {
    
    set movies(movie){
        this._movies = movie;
        this.render();
    }

    render() {
        const pageNumber = document.createElement("page-number");
        pageNumber.classList.add('carousel-indicators');

        const popularItem = document.createElement("popular-item");
        popularItem.classList.add('carousel-inner');

        this.classList.add('carousel', 'slide', 'carousel-fade');
        this.setAttribute("data-ride","carousel");
        this.innerHTML = "";
        
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