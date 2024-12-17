import js from "@eslint/js";
import {rules} from "eslint-config-airbnb-base";

export default [
  js.configs.recommended,
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/coverage/**", "**/build/**"],
    plugins: {
      extends: ["airbnb-base/legacy"]
    },
    rules: {"import/extensions": ["error","ignorePackages"]}
  },
];