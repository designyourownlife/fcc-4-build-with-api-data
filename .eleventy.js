module.exports = function(config) {

  config.setBrowserSyncConfig({
    https: {
      key: 'etc/localhost.key',
      cert: 'etc/localhost.crt'
    }
  });

  config.addPassthroughCopy("src/js");
  config.addPassthroughCopy("src/css");
  return  {
    dir: {
      input: "src",
      output: "dist",
      data: "_data"
    }
  };

};
