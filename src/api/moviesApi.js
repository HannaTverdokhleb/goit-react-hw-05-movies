import axios from "axios";


axios.defaults.method = 'GET';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers = {
  accept: 'application/json',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDFlMWY1YzI1NjZhMjRmOTM1ODdkNDc4NjhkOTViYiIsInN1YiI6IjY0OWNhZGIzMDkxZTYyMDBlYjdhNmFlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AtCYjY_9pVtVlsS1c4OH_18eiiJu71qW3LcygXH_Uxw'
};
axios.defaults.params = {
  language: 'en-US',
}


export const getTrends = async () => {
  const { data } = await axios.get('/trending/all/day', {
    transformResponse: (data) => {
      let res = JSON.parse(data);
      return res.results.map((result) => ({
        id: result.id,
        title: result.name ?? result.title,
      }))
    }
  })
  return data
}


export const getMovie = async (term) => {
  if (!term || term === '') return []
  const { data } = await axios.get('/search/movie', {
    transformResponse: (data) => {
      let res = JSON.parse(data);
      return res.results.map((result) => ({
        id: result.id,
        title: result.name ?? result.title,
      }))
    }, 
    params: {
      include_adult: 'false', 
      page: '1', 
      query: term
    }
  })
  return data
}


export const getMovieInfo = async (movieId) => {
  if (movieId) {
    const { data } = await axios.get('/movie/' + movieId);
    return data
  }
}


export const getActors = async (movieId) => {
  if (movieId) {
    const {data} = await axios.get('/movie/'+ movieId +'/credits')
    return data
  }  
}


export const getReviews = async (movieId) => {
  if (movieId) {
    const {data} = await axios.get('/movie/'+ movieId +'/reviews', {
      transformResponse: (data) => {
        let res = JSON.parse(data);
        return res.results.map(({id, author, content}) => ({
          id,
          author,
          content,
        }))
      }
    })
    return data
    
  }
}
