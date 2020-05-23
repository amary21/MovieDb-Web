import baseUrl from './baseurl.js';

class Popular{
    static getPopular(){
        return fetch(`${baseUrl.url_main}/movie/popular?api_key=${baseUrl.api_key}`)
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

export default Popular;;