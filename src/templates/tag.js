import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing";
import * as styles from "./tag.module.scss";
import config from "../../data/SiteConfig";

const TagTemplate = ({ data, pageContext }) => (
  <Layout>
    <main>
      <Helmet
        title={`Posts tagged as "${pageContext.tag}" | ${config.siteTitle}`}
      />
      <h1 className={styles.tagTitle}>Tag: {pageContext.tag}</h1>
      <PostListing postEdges={data.allMarkdownRemark.edges} />
    </main>
  </Layout>
);
export default TagTemplate;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt
          timeToRead
          frontmatter {
            title
            thumbnail {
              childImageSharp {
                gatsbyImageData(quality: 100, layout: FIXED)
              }
            }
            date
            categories
            author
            authorAvatar
            authorTwitter
          }
        }
      }
    }
  }
`;
