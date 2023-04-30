module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/_colors.scss";
          @import "@/styles/_global.scss";
        `
      }
    }
  }
};
