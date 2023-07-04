import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getActors } from 'api/moviesApi';


const Cast = () => {
    const [actors, setActors] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        async function asd() {
            let info = [];
            try {
                info = await getActors(movieId);
            }
            catch(err) {
                alert(err.message);
            }
            finally {
                setActors(info);
            }
        }
        asd();
    }, [movieId]);


    return (
        <>
            <h2>Cast</h2>
            {actors.cast && 
                <ul>
                    {actors.cast.map(({id, profile_path, name, character}) => {
                        return (
                            <li key={id}>
                                <img src={profile_path ? 'https://image.tmdb.org/t/p/w200' + profile_path : '#'} alt={name} width="200" />
                                <p>{name}</p>
                                <p>{character}</p>
                            </li>
                        )
                    })}
                </ul>
            }
        </>
    )
}

export default Cast;