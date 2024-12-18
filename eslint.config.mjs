import js from "@eslint/js";
import airbnbBase from 'eslint-config-airbnb-base';
import importPlugin from "eslint-plugin-import";

const { rules } = airbnbBase;

export default [
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/coverage/**", "**/build/**", '**/__tests__/**', 'webpack.config.js', 'eslint.config.mjs'],
  },
  js.configs.recommended,
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/extensions": ["error", "ignorePackages"],
    },
  },
];