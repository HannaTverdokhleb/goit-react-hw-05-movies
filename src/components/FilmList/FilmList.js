import { Link, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';


const FilmList = ({list}) => {

    const localion = useLocation();

    return (
        <ul>
           {list.map(({id, title}) => {
            return (
                <li key={id}>
                    <Link id={id} to={'/movies/' + id} state={{ from: localion }} >{title}</Link>
                </li>
           )})} 
        </ul>
    )
}

export default FilmList;

FilmList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired
}