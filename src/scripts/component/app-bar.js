import appBar from './_styles/app-bar.js';

class AppBar extends HTMLElement {

    connectedCallback(){
        this.render();
    }

    set clickEvent(event){
        this._clickEvent = event;
        this.render();
    }

    get value(){
        return this.querySelector("#inputSearch").value;
    }

    render() {
        this.innerHTML = `
        <style>${appBar}</style>
        <div id="appBar" class="app-bar">
                <nav class="navbar">
                    <a href="index.html" class="button"><h2 class="title-bar">Movie Cat</h2></a>
                    <div class="form-inline">
                        <div class="search-container">
                            <input id="inputSearch" class="search-input" type="search" placeholder="Search" aria-label="Search">
                            <button id="searchButtonElement" class="search-button" type="submit">Search</button>
                        </div>
                    </div>
                </nav>
            </div>`;
    }
}

customElements.define("app-bar", AppBar);