module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:@next/next/recommended", "google", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-no-undef": "off",
    "react/display-name": "off",
    "require-jsdoc": "off",
    "@next/next/no-img-element": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
