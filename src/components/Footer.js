import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import * as styles from "./Footer.module.scss";
import config from "../../data/SiteConfig";

const Footer = () => (
  <footer>
    <div className={styles.container}>
      <a
        href={config.siteRss}
        className={styles.subscribe}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faRss} /> SUBSCRIBE
      </a>
      <div className={styles.copyright}>{config.copyright}</div>
    </div>
  </footer>
);

export default Footer;
