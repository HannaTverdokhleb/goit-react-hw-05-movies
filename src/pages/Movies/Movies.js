import {getMovie} from 'api/moviesApi';
import { useState, useEffect } from 'react';
import FilmList from 'components/FilmList/FilmList';
import { useSearchParams } from 'react-router-dom';


const Movies = () => {
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ movieList, setMovieList ] = useState([]);
    const [ searchParams, setSearchParams ] = useSearchParams();

    const queryApi = searchParams.get('query') ?? '';

    useEffect(() => {
        setSearchQuery(queryApi);
        async function asd() {
            let trendsToday = [];
            try {
                trendsToday = await getMovie(queryApi);
            }
            catch(err) {
                alert(err.message);
            }
            finally {
                setMovieList(trendsToday);
            }
        }
        asd()
    }, [queryApi])

    const hendleSearch = (e) => {
        e.preventDefault();
        setSearchParams(searchQuery === '' ? {} : {query: searchQuery});
    }

    return (
        <div>
            <h2>Movies</h2>
            <form autoComplete="off" onSubmit={hendleSearch}>
                <input 
                    type="search" 
                    name="search" 
                    value={searchQuery}
                    onChange={e => {setSearchQuery(e.target.value)}}
                />
                <button type="submit">Search</button>
            </form>

            <FilmList list={movieList} />
        </div>
    )
}

export default Movies;