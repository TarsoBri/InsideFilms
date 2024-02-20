import styles from "./NavBar.module.css";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.icon}>
        <span>InsideFilms§</span>
      </Link>
      <ul className={styles.navlinks}>
        <li>
          <NavLink to="/favorites">
            Favoritos
            <span></span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
