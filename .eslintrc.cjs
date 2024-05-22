module.exports = {
    extends: [ "eslint:recommended", "plugin:@typescript-eslint/recommended" ],
    parser: "@typescript-eslint/parser",
    plugins: [ "@typescript-eslint" ],
    root: true,
    env: {
      "node": true,
      "browser": true
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [ "error", { "argsIgnorePattern": "^_" } ],
      // "@typescript-eslint/explicit-function-return-type": "error",
      // "semi": [ "error", "always" ],
      "@typescript-eslint/semi": [ "error", "always" ],
      "quotes": [ "error", "double" ],
      "object-curly-spacing": [ "error", "always" ],
      "space-infix-ops": "error",
      "array-bracket-spacing": [ "error", "always" ],
      "space-before-blocks": [ "error", "always" ],
      "@typescript-eslint/type-annotation-spacing": [ "error", {
        "before": false,
        "after": true
      } ],
      // "space-before-function-paren": [ "error", "never" ],
      "indent": [ "error", "tab" ],
      "linebreak-style": [ "error", "unix" ],
      "eol-last": ["error", "always"],
      "@typescript-eslint/ban-ts-comment": "off"
    }
  }