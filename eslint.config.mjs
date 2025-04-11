// @ts-check
import eslint from "@eslint/js";
import typescriptEsLint from "typescript-eslint";
import angular from "angular-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default typescriptEsLint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...typescriptEsLint.configs.recommended,
      ...typescriptEsLint.configs.stylistic,
      ...angular.configs.tsRecommended,
      eslintConfigPrettier,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      eslintConfigPrettier,
    ],
    rules: {},
  },
);
