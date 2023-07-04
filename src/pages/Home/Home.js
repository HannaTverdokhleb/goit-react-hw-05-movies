import {getTrends} from 'api/moviesApi';
import {useState, useEffect} from 'react';
import FilmList from 'components/FilmList/FilmList';


const Home = () => {
    const [trends, setTrends] = useState([]);

    useEffect(() => {
        async function asd() {
            let trendsToday = [];
            try {
                trendsToday = await getTrends();
            }
            catch(err) {
                alert(err.message);
            }
            finally {
                setTrends(trendsToday);
            }
        }
        asd()
    }, [])
    
    return (
        <div>
            <h2>Homepage</h2>
            <FilmList list={trends} />
        </div>
    )
}

export default Home;
