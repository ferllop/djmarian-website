const embedVimeo = require("eleventy-plugin-vimeo-embed")

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedVimeo)

  return {
    dir: {
      input: "src",
      output: "build",
    }
  }
}

