const search = 
    `* {
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
    }`

export default search;