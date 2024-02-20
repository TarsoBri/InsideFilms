import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.notfound}>
      <h2>404</h2>
      <p>Nenhuma pagina encontrada com essa URL</p>
      <Link to="/">Início</Link>
    </div>
  );
};

export default NotFound;
