const year = new Date().getFullYear();
const siteTitle = "Ramblings of a Madman";
const config = {
  siteTitle,
  siteTitleShort:
    "General Ramblings About all things JavaScript and Browser Developer Tools",
  siteTitleAlt:
    "General Ramblings About all things JavaScript and Browser Developer Tools",
  siteLogo: "/logos/mike-caricature.jpg",
  siteUrl: "https://flailingmonkey.com",
  pathPrefix: "",
  siteDescription:
    "General Ramblings About all things JavaScript and Browser Developer Tools",
  siteRss: "/rss.xml",
  siteFBAppID: "1825356251115265",
  googleAnalyticsID: "UA-5877089-2",
  dateFromFormat: "YYYY-MM-DD",
  dateFormat: "DD MMM YYYY",
  userName: "Mike Ratcliffe",
  userEmail: "michael@ratcliffefamily.org",
  userTwitter: "ratcliffe_mike",
  userGitHub: "MikeRatcliffe",
  userLocation: "Corby, England",
  userAvatar:
    "https://www.gravatar.com/avatar/7de9609bb8d1394e8f6236bd0fac2d7b.jpg",
  userDescription:
    "Software Engineer specializing in Browser related stuff. Open source advocate, web dev. JavaScript fanatic, CSS tinkerer loves HTML5 & semicolons, hates XUL.",
  copyright: `${siteTitle} © ${year}`,
  themeColor: "#FFFFFF",
  backgroundColor: "#000000",
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

module.exports = config;
