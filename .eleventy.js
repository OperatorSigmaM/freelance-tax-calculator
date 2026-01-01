module.exports = function(eleventyConfig) {
  // Копируем папки и файлы напрямую в итоговый сайт
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/googlef689d6ec7277c7f1.html");
  
  // Если у тебя есть картинки или другие папки, добавь их сюда так же
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    // Указываем, что работаем с Nunjucks (njk)
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};