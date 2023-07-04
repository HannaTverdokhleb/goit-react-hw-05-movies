import { Outlet, Link, useLocation, useParams } from "react-router-dom";
import { getMovieInfo } from "api/moviesApi";
import { useState, useEffect, useRef } from "react";


const MovieDetails = () => {
    const [movieInfo, setMovieInfo] = useState({});
    const { movieId } = useParams();
    const location = useLocation();
    const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

    useEffect(() => {
        async function asd() {
            let info = {};
            try {
                info = await getMovieInfo(movieId);
            }
            catch(err) {
                alert(err.message);
            }
            finally {
                setMovieInfo(info);
            }
        }
        asd();
    }, [movieId]);

    const {poster_path, backdrop_path, original_title, vote_count, overview, genres} = movieInfo;
    
    return (
        <>
            <Link to={backLinkLocationRef.current}>Back</Link>
            <div className="movie-details">
                <img src={(poster_path || backdrop_path) ? 'https://image.tmdb.org/t/p/w300' + (poster_path ?? backdrop_path) : '#'} alt={original_title} width="300" />
                <div>
                    <h2>{original_title}</h2>
                    <p>User score: {vote_count}%</p>
                    <h3>Overview</h3>
                    <p>{overview}</p>
                    <h3>Genres</h3>
                    <p>
                        {genres && genres.map((genre) => {
                            return genre.name + ' ';
                        })}
                    </p>
                </div>
            </div>
            <div>
                <h4>Additional information</h4>
                <nav>
                    <Link to="cast">Cast</Link>
                    <Link to="reviews">Reviews</Link>
                </nav>
            </div>

            <Outlet />
        </>
    )
}

export default MovieDetails;