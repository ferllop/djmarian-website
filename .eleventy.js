const embedVimeo = require("eleventy-plugin-vimeo-embed")

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedVimeo, {
      with: 300,
      height: 150,
      frameborder: 0,
      allowFullscreen: true,
      dnt: true,
      embedClass: 'eleventy-plugin-vimeo-embed'
  })

  return {
    dir: {
      input: "src",
      output: "build",
    },
    markdownTemplateEngine: "njk",
  }
}

