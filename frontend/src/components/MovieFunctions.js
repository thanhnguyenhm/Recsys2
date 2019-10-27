import axios from 'axios'

export const getMovies = query => {
    return axios
        .get('movies', {
            params: { search: query, limit: 5 }
        })
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
} 