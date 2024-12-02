module.exports = {
  env: {
    node: true, // Enable Node.js global variables like `require` and `process`
    es2021: true, // Enable ES2021 features
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Integrate Prettier with ESLint
  ],
  parser: '@typescript-eslint/parser', // Use TypeScript parser
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module', // Allow `import` and `export` syntax
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-undef': 'off', // Turn off `no-undef` as Node.js globals are used
    '@typescript-eslint/no-var-requires': 'off', // Allow `require` statements in TypeScript
    'prettier/prettier': [
      'error',
      {
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
        tabWidth: 2,
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'always',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off', // Warn about `any` type, but don't error out
  },
};
