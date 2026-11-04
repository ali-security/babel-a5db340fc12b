module.exports = function() {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name === "HELPER_WRAP_REGEXP") {
          const helper = this.addHelper("wrapRegExp");
          path.replaceWith(helper);
        }
      },
    },
  };
};
