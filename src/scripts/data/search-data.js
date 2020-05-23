import baseUrl from './baseurl.js';

class Search{
    static getSearch(query){
        return fetch(`${baseUrl.url_main}/search/movie?query=${query}&api_key=${baseUrl.api_key}`)
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

export default Search;