import baseUrl from './baseurl.js';

class Detail{
    static getDetail(id){
        return fetch(`${baseUrl.url_main}/movie/${id}?api_key=${baseUrl.api_key}`)
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson!= null) {
                    return Promise.resolve(responseJson);
                }else {
                    return Promise.reject(null);
                }
            })        
    }
}

export default Detail;