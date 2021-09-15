import React from "react";
import { Link } from "gatsby";
import * as styles from "./Meta.module.scss";

function getTwitterLink(author, twitterHandle, avatar) {
  if (!author || !twitterHandle || !avatar) {
    return "";
  }

  return (
    <a href={`https://twitter.com/${twitterHandle}`}>
      <img className={styles.author} src={avatar} alt={`${author}'s avatar`} />
      {author}
    </a>
  );
}

function getCategoryLinks(categories) {
  if (!categories) {
    return "";
  }

  return categories.map((category, i) => (
    <span key={category}>
      {i === 0 && " | "}
      <span>
        {i > 0 && ", "}
        <Link to={`/${category.toLowerCase()}`}>{category}</Link>
      </span>
    </span>
  ));
}

const Meta = (props) => {
  const { author, twitterHandle, avatar, categories, date } = props;

  const twitterLink = getTwitterLink(author, twitterHandle, avatar);
  const categoryList = getCategoryLinks(categories);
  const dateString = date ? ` | ${date}` : "";

  return (
    <div className={styles.meta}>
      {twitterLink}
      {categoryList}
      {dateString}
    </div>
  );
};

export default Meta;
