module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-duplicate-imports': 'error',
    'no-unused-expressions': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    eqeqeq: ['error', 'always'],
    curly: ['error', 'all'],
    'no-throw-literal': 'error',
    'prefer-template': 'warn',
    'object-shorthand': 'warn',
    'no-useless-return': 'warn',
    'no-else-return': 'warn',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
    ],
    'sort-imports': [
      'warn',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['src/*'],
            message: 'Do not use absolute imports starting with "src/". Use relative imports instead.',
          },
        ],
      },
    ],
  },
}
