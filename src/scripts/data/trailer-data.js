import baseUrl from './baseurl.js';

class Trailer{
    static getTrailer(id){
        return fetch(`${baseUrl.url_main}/movie/${id}/videos?api_key=${baseUrl.api_key}`)
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson.results!= null) {
                    return Promise.resolve(responseJson.results);
                }else {
                    return Promise.reject(null);
                }
            })        
    }
}

export default Trailer;