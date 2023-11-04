const urljoin = require("url-join");
const siteConfig = require("./data/SiteConfig");

module.exports = {
  pathPrefix: siteConfig.pathPrefix === "" ? "/" : siteConfig.pathPrefix,
  siteMetadata: {
    siteUrl: urljoin(siteConfig.siteUrl, siteConfig.pathPrefix),
    rssMetadata: {
      site_url: urljoin(siteConfig.siteUrl, siteConfig.pathPrefix),
      feed_url: urljoin(
        siteConfig.siteUrl,
        siteConfig.pathPrefix,
        siteConfig.siteRss
      ),
      title: siteConfig.siteTitle,
      description: siteConfig.siteDescription,
      image_url: `${urljoin(
        siteConfig.siteUrl,
        siteConfig.pathPrefix
      )}/logos/logo-48.png`,
      copyright: siteConfig.copyright,
    },
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sass",
    },
    "gatsby-plugin-htaccess",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/static/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `flailingmonkeycom`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,

        plugins: [
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              related: false,
              noIframeBorder: true,
              loadingStrategy: "lazy",
              iframeId: false,
            },
          },
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "Table of Contents",
              tight: false,
              ordered: false,
              fromHeading: 1,
              toHeading: 6,
              className: "table-of-contents",
            },
          },
          {
            resolve: `gatsby-remark-footnotes`,
            options: {
              footnoteBackRefPreviousElementDisplay: "inline",
              footnoteBackRefDisplay: "inline",
              footnoteBackRefAnchorStyle: `text-decoration: none;`,
              useFootnoteMarkerText: false,
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 690,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
          },
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-autolink-headers",
          "gatsby-remark-prismjs",
        ],
      },
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: siteConfig.themeColor,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-catch-links",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "/",
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: siteConfig.siteTitle,
        short_name: siteConfig.siteTitleShort,
        description: siteConfig.siteDescription,
        lang: "en",
        start_url: siteConfig.pathPrefix,
        background_color: siteConfig.backgroundColor,
        theme_color: siteConfig.themeColor,
        display: "minimal-ui",
        icon: `src/images/favicon.svg`,
      },
    },
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-feed",
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata;
          ret.allMarkdownRemark = ref.query.allMarkdownRemark;
          ret.generator = "GatsbyJS Advanced Starter";
          return ret;
        },
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                copyright
              }
            }
          }
        }
      `,
        feeds: [
          {
            serialize({ query: { site, allMarkdownRemark } }) {
              const { rssMetadata } = site.siteMetadata;
              return allMarkdownRemark.edges.map((edge) => ({
                ...edge.node.frontmatter,
                tags: edge.node.frontmatter.tags,
                date: edge.node.fields.date,
                title: edge.node.frontmatter.title,
                description: edge.node.excerpt,
                url: `${rssMetadata.site_url}${edge.node.fields.slug}/`,
                guid: `${rssMetadata.site_url}${edge.node.fields.slug}/`,
                custom_elements: [
                  { "content:encoded": edge.node.html },
                  { author: siteConfig.userEmail },
                ],
              }));
            },
            query: `
            {
              allMarkdownRemark(limit: 1000, sort: {frontmatter: {date: DESC}}) {
                edges {
                  node {
                    excerpt
                    html
                    timeToRead
                    fields {
                      slug
                      date
                    }
                    frontmatter {
                      featuredImage {
                        childImageSharp {
                          gatsbyImageData(quality: 100, layout: CONSTRAINED)
                        }
                      }
                      title
                      thumbnail {
                        childImageSharp {
                          gatsbyImageData(quality: 100, layout: FIXED)
                        }
                      }
                      date
                      categories
                      tags
                      author
                      authorAvatar
                      authorTwitter
                    }
                  }
                }
              }
            }
          `,
            output: siteConfig.siteRss,
            title: siteConfig.siteRss,
          },
        ],
      },
    },
  ],
};
