import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";

const Index = ({ data }) => (
  <Layout>
    <main>
      <Helmet title={config.siteTitle} />
      <SEO />
      <PostListing postEdges={data.allMarkdownRemark.edges} />
    </main>
  </Layout>
);

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(limit: 2000, sort: {frontmatter: {date: DESC}}) {
      edges {
        node {
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt(pruneLength: 227)
          frontmatter {
            title
            thumbnail {
              childImageSharp {
                gatsbyImageData(quality: 100, width: 150, layout: FIXED)
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
