import baseUrl from './baseurl.js';

class Movie{
    static getMovie(query){
        return fetch(`${baseUrl.url_main}/movie/${query}?api_key=${baseUrl.api_key}`)
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson.results != null) {
                    return Promise.resolve(responseJson.results);
                }else {
                    return Promise.reject(null);
                }
            })        
    }
}

export default Movie;