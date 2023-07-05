import { lazy, Suspense } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import styled from "styled-components";
const Home = lazy(() => import("pages/Home/Home"));
const Movies = lazy(() => import('pages/Movies/Movies'));
const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));
const Cast = lazy(() => import('components/Cast/Cast'));
const Reviews = lazy(() => import('components/Reviews/Reviews'));



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

export const App = () => {

  return (
    <div className="container">
      <nav className="headerNav">
        <StyledLink to="/" end>Home</StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
};


