import React from "react";
import _ from "lodash";
import { Link } from "gatsby";
import * as styles from "./PostTags.module.scss";

const PostTags = ({ tags }) => (
  <div className={styles.tagContainer}>
    {tags &&
      tags.map((tag) => (
        <Link key={tag} to={`/tags/${_.kebabCase(tag)}`}>
          <span>{tag}</span>
        </Link>
      ))}
  </div>
);

export default PostTags;
