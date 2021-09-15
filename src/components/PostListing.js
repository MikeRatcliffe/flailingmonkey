import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Meta from "./Meta";
import * as styles from "./PostListing.module.scss";

const PostListing = ({ postEdges }) => {
  const getPostList = () => {
    const postList = [];
    postEdges.forEach((postEdge) => {
      postList.push({
        author: postEdge.node.frontmatter.author,
        authorAvatar: postEdge.node.frontmatter.authorAvatar,
        authorTwitter: postEdge.node.frontmatter.authorTwitter,
        path: `/${postEdge.node.fields.slug}`,
        categories: postEdge.node.frontmatter.categories,
        thumbnail: postEdge.node.frontmatter.thumbnail,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead,
      });
    });
    return postList;
  };

  const postList = getPostList();
  return (
    <div className={styles.articleList}>
      {postList.map((post) => (
        <article className={styles.articleBox} key={post.title}>
          <div className={styles.right}>
            <Link to={post.path}>
              <h2>{post.title}</h2>
              <GatsbyImage
                className={styles.postThumb}
                image={post.thumbnail.childImageSharp.gatsbyImageData}
                alt=""
              />
              <div className={styles.excerpt}>{post.excerpt}</div>
            </Link>
            <Meta
              author={post.author}
              twitterHandle={post.authorTwitter}
              avatar={post.authorAvatar}
              categories={post.categories}
              date={post.date}
            />
          </div>
        </article>
      ))}
    </div>
  );
};

export default PostListing;
