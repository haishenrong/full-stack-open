module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "sourceType": "module",
        "tsconfigRootDir": __dirname,
        "project": "./tsconfig.json",
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/semi": ["error"],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/restrict-plus-operands": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { "argsIgnorePattern": "^_" }
        ],
        "no-case-declarations": "off"
    },
    "ignorePatterns": [".eslintrc.js"]
};
