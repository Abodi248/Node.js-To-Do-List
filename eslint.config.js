// eslint.config.js
import { defineConfig } from "eslint-define-config";

export default defineConfig({
  languageOptions: {
    globals: {
      // Node.js globals
      console: "readonly",
      process: "readonly",
      module: "readonly",
      require: "readonly",
      __dirname: "readonly",
      __filename: "readonly",
      // Jest globals
      describe: "readonly",
      test: "readonly",
      expect: "readonly",
      beforeEach: "readonly",
      afterEach: "readonly"
    },
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: "module"
    }
  },
  plugins: {},
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off",
    "semi": ["error", "always"]
  },
  extends: ["eslint:recommended"]
});
