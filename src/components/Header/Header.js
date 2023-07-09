import { NavLink } from "react-router-dom";
import styled from "styled-components";
import style from './Header.module.css';


const StyledLink = styled(NavLink)`
  color: black;
  dispaly: inline-block;

  &:nth-child(2) {
    margin-left: 20px;
  }

  &.active {
    color: orange;
  }
`;

const Header = () => {

  return (
    <nav className={style.headerNav}>
        <StyledLink to="/" end>Home</StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
    </nav>
  );
};

export default Header;
