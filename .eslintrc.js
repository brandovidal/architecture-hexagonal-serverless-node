module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint-config-standard-with-typescript'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'warn',
    '@typescript-eslint/promise-function-async': 'off',
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/no-floating-promises": "warn",
    '@typescript-eslint/no-misused-promises': [
      'warn',
      { 'checksVoidReturn': false }
    ]
  }
}
