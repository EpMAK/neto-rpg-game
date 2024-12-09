import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/coverage/**", "**/build/**"],
    plugins: {
      extends: ["airbnb-base/legacy"]
    },
  }
];