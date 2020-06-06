const detail = 
    `     * {
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
    }`

export default detail;