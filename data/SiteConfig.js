const config = {
  siteTitle: "Matthew Shields | Leeds based Web Developer", // Site title.
  siteTitleShort: "Leeds based Web Developer", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Matthew Shields | Leeds based Web Developer", // Alternative site title for SEO.
  siteLogo: "/theme_images/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://matthewshields.co.uk", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "A Leeds, UK based developer. Specialising in PHP, JavaScript and front-end builds.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "", // FB Application ID for using app insights
  googleAnalyticsID: "UA-53672778-1", // GA tracking ID.
  postDefaultCategoryID: "Tech", // Default category for posts.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  postsPerPage: 10, // Amount of posts displayed per listing page.
  userName: "Matthew Shields", // Username to display in the author segment.
  userEmail: "info@matthewshields.co.uk", // Email used for RSS feed's author segment
  userTwitter: "", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Leeds, UK", // User location to display in the author segment.
  userAvatar: "https://api.adorable.io/avatars/150/test.png", // User avatar to display in the author segment.
  userDescription:
    "Yeah, I like animals better than people sometimes... Especially dogs. Dogs are the best. Every time you come home, they act like they haven't seen you in a year. And the good thing about dogs... is they got different dogs for different people.", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "Codepen",
      url: "https://codepen.io/MatthewShields/",
      target: "_blank"
    },
    {
      label: "GitHub",
      url: "https://github.com/MatthewShields",
      target: "_blank"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/whatsthatweasel",
      target: "_blank"
    },
    {
      label: "Email",
      url: "mailto:info@matthewshields.co.uk",
      target: "_self"
    }
  ],
  copyright: "Copyright © 2020 Matthew Shields", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0" // Used for setting manifest background color.
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

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== "/")
  config.siteRss = `/${config.siteRss}`;

module.exports = config;
