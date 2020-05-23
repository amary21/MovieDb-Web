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
       <style>
            * {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }

            .app-bar{
                background: #1F4068;
            }
            
            .navbar {
                width: 100%;
                max-width: 1000px;
                margin: auto;
            }
            
            .title-bar{
                color: white;
                font-family: Roboto;
            }

            a.button{
                text-decoration: none;
            }

            .search-container{
                position: absolute;
                width: 50%;
                height: 38px;
                margin-right: 16px;
                right: 0px;
            }
            
            .search-button{
                position: absolute;
                margin-left: 16px;
                margin: auto;
                border-color: transparent;
                right: 0%;
                color: white;
                background: #E43F5A;
                width: 80px;
                height: 38px;
                border-radius: 25px;
            
            }
            
            .search-input{
                position: absolute;
                padding: 8px;
                width: 90%;
                right: 90px;
                height: 38px;
                border-color: transparent;
                background: #162447;
                border-radius: 25px;
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                font-size: 18px;
                color: rgba(242, 242, 242, 0.75);
                
            }
            
       </style>
       
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