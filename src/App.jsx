import "./App.css";

// Router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// contexts
import { FavoritesProvider } from "./contexts/FavoritesContext";

// componets
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import SearchBar from "./components/SearchBar/SearchBar";
import NotFound from "./pages/NotFound/NotFound";

// pages
import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Search from "./pages/Search/Search";
import Favorites from "./pages/Favorites/Favorites";

const App = () => {
  return (
    <div className="App">
      <FavoritesProvider>
        <BrowserRouter>
          <div>
            <NavBar />
            <SearchBar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movieDetails/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/search/:id" element={<Search />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </FavoritesProvider>
    </div>
  );
};

export default App;
