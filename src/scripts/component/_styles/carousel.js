const carousel =
    `* {
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
    }`

export default carousel;