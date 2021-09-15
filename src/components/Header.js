import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import config from "../../data/SiteConfig";
import * as styles from "./Header.module.scss";

const Header = () => (
  <header>
    <Link to="/">
      <StaticImage
        src="../images/logo.png"
        className={styles.logo}
        alt="Logo"
        layout="constrained"
        width="150"
        quality="100"
      />
    </Link>
    <h1>{config.siteTitle}</h1>
    <h2>{config.siteTitleShort}</h2>
  </header>
);

export default Header;
