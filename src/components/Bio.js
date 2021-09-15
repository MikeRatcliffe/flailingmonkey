import React from "react";
import { Follow } from "react-twitter-widgets";
import * as styles from "./Bio.module.scss";

const Bio = ({ config, expanded }) => (
  <>
    <img
      className={styles.avatar}
      src={config.userAvatar}
      alt={config.userName}
    />
    <div>
      <p className={styles.text}>
        Written by <strong>{config.userName}</strong> who lives and works in
        Corby, England building useful things.
      </p>
      <Follow
        username={config.userTwitter}
        options={{
          count: expanded ? true : "none",
          size: "large",
          align: "right",
        }}
      />
    </div>
  </>
);

export default Bio;
