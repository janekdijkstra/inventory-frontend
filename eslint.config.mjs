import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

import reactCompiler from "eslint-plugin-react-compiler";
import prettier from "eslint-plugin-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      "react-compiler": reactCompiler,
      prettier,
      eslintPluginPrettierRecommended,
    },

    rules: {
      "react/no-unescaped-entities": 0,
      "react-compiler/react-compiler": "error",

      quotes: ["error", "double"],
      "arrow-body-style": ["error", "as-needed"],
      "linebreak-style": ["error", "unix"],
      semi: ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
    },
  },
]);

export default eslintConfig;
