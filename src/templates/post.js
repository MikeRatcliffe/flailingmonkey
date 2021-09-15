import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { Disqus } from "gatsby-plugin-disqus";
import Layout from "../layout";
import Bio from "../components/Bio";
import PostTags from "../components/PostTags";
import SocialLinks from "../components/SocialLinks";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";
import Meta from "../components/Meta";
import * as styles from "./post.module.scss";
import "./prism-okaidia.css";

function prev(prevslug, prevtitle) {
  if (prevslug) {
    return (
      <Link to={prevslug} rel="prev" title={prevtitle}>
        ← Older
      </Link>
    );
  }
  return null;
}

function next(nextslug, nexttitle) {
  if (nextslug) {
    return (
      <Link to={nextslug} rel="next" title={nexttitle}>
        Newer →
      </Link>
    );
  }
  return null;
}

const PostTemplate = ({ data, pageContext }) => {
  const { slug, nexttitle, nextslug, prevtitle, prevslug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  const date = postNode.fields.date;

  if (!post.id) {
    post.id = slug;
  }

  const disqusConfig = {
    url: `${config.siteUrl}/${slug}/`,
    title: post.title,
  };

  return (
    <Layout>
      <main>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <div className={styles.container}>
          <h1>{post.title}</h1>
          <Meta
            author={post.author}
            twitterHandle={post.authorTwitter}
            avatar={post.authorAvatar}
            date={date}
          />
          <div className={styles.postMeta}>
            <PostTags tags={post.tags} />
          </div>
          <div className={styles.featuredImageContainer}>
            <GatsbyImage
              image={post.featuredImage.childImageSharp.gatsbyImageData}
              alt=""
            />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          <hr />
          <Bio config={config} expanded />
          <div className={styles.postMeta}>
            <SocialLinks postPath={slug} postNode={postNode} />
          </div>
          <nav>
            <ul className={styles.pagination}>
              <li>{prev(prevslug, prevtitle)}</li>
              <li>{next(nextslug, nexttitle)}</li>
            </ul>
          </nav>
          <hr />
          <Disqus config={disqusConfig} />
        </div>
      </main>
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        featuredImage {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: CONSTRAINED)
          }
        }
        title
        date
        tags
        author
        authorAvatar
        authorTwitter
      }
      fields {
        slug
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
