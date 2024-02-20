import styles from "./CardFavs.module.css";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";

export const CardFavs = ({ type }) => {
  let timer;
  const [width, setWidth] = useState(0);

  const updateWidth = () => {
    timer = setInterval(() => {
      setWidth((prevWidth) => prevWidth + 17);
    }, 440);
  };

  useEffect(() => {
    updateWidth();

    setWidth(0);
    return () => clearInterval(timer);
  }, [type]);

  return (
    <div className={styles.card}>
      <div>
        <p style={{ backgroundColor: type.color }}>
          {type.title} <span>{type.content}</span>
        </p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 0.5 }}
          className={styles.card_loader}
        ></motion.div>
      </div>
    </div>
  );
};
