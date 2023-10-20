module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['standard', 'eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['simple-import-sort'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'consistent-return': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'no-redeclare': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            // Side effect imports.
            '^\\u0000',
            '^@?\\w',
            // Internal packages.
            '^(src|components|config|utils|pages|hooks|api)(/.*|$)',
            // Parent imports. Put `..` last.
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            // Other relative imports. Put same-folder imports and `.` last.
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
            // Style imports.
            '^.+\\.s?css$'
          ]
        ]
      }
    ],
    'simple-import-sort/exports': 'error',
    'func-call-spacing': 'off'
  }
}
