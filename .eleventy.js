const sitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://freelance-tax-calculator-lime.vercel.app",
    },
  });
  
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/googlef689d6ec7277c7f1.html");
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};