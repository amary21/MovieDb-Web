const appBar = 
    `* {
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
        
    }`

export default appBar;