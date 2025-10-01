// eslint.config.js
import { defineConfig } from "eslint-define-config";

export default defineConfig({
  env: {
    node: true,
    es2022: true,
    jest: true
  },
  extends: [
    "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module"
  },
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off",
    "semi": ["error", "always"]
  }
});
