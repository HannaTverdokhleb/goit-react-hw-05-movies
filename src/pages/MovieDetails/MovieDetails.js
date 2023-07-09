import { Outlet, Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { getMovieInfo } from "api/moviesApi";
import { useState, useEffect, useRef } from "react";
import style from 'pages/MovieDetails/MovieDetails.module.css';
import placeholder from 'empty.png';


const MovieDetails = () => {
    const [movieInfo, setMovieInfo] = useState({});
    const { movieId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

    useEffect(() => {
        async function asd() {
            let info = {};
            try {
                info = await getMovieInfo(movieId);
            }
            catch(err) {
                if (err.message && err.message === 'Request failed with status code 404') {
                    navigate('/');
                } else {
                    alert(err.message);
                }
            }
            finally {
                setMovieInfo(info);
            }
        }
        asd();
    }, [movieId, navigate]);

    const {poster_path, original_title, vote_count, overview, genres} = movieInfo;
    
    return (
        <>
            <Link className={style.backLink} to={backLinkLocationRef.current}>Back</Link>
            <div className={style.movieDetails}>
                <img src={poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}` : placeholder} alt={original_title} width="300" height="450" />
                <div className={style.detailsText}>
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
                    <Link className={style.link} to="cast">Cast</Link>
                    <Link className={style.link} to="reviews">Reviews</Link>
                </nav>
            </div>

            <Outlet />
        </>
    )
}

export default MovieDetails;