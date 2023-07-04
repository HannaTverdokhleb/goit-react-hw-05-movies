import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from 'api/moviesApi';


const Reviews = () => {

    const [reviews, setReviews] = useState({});
    const { movieId } = useParams();

    useEffect(() => {
        async function asd() {
            let info = [];
            try {
                info = await getReviews(movieId);
            }
            catch(err) {
                alert(err.message);
            }
            finally {
                setReviews(info);
            }
        }
        asd();
    }, [movieId]);

    return (
        <>
            <h2>Reviews</h2>
            {reviews.length > 0 ?
                <ul>
                    {reviews.map(({id, author, content}) => (
                        <li key={id}>
                            <b>Author: {author}</b>
                            <p>{content}</p>
                        </li>
                    ))}
                </ul>
            : <div>No reviews</div>}
        </>
    )
}

export default Reviews;