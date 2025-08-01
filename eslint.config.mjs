import nx from '@nx/eslint-plugin';
import tanstackQueryPlugin from '@tanstack/eslint-plugin-query';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import svgJsxPlugin from 'eslint-plugin-svg-jsx';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        process: 'readonly',
        module: 'writable',
        require: 'readonly',
        __dirname: 'readonly',
      },
    },
  },
  // React configuration
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // JSX A11y plugin configuration (accessibility)
  {
    plugins: {
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      ...jsxA11yPlugin.configs.recommended.rules,
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['to'],
        },
      ],
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          assert: 'either',
        },
      ],
    },
  },
  // SonarJS plugin configuration (code quality)
  {
    plugins: {
      sonarjs: sonarjsPlugin,
    },
    rules: {
      ...sonarjsPlugin.configs.recommended.rules,
      'sonarjs/no-duplicate-string': ['error', { threshold: 5 }],
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-unused-vars': 'off',
      'sonarjs/todo-tag': 'off',
    },
  },
  // Import plugin configuration
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          groups: [
            'external',
            'builtin',
            'index',
            'sibling',
            'parent',
            'internal',
            'object',
          ],
          'newlines-between': 'always',
        },
      ],
    },
  },
  // TanStack Query plugin configuration
  {
    plugins: {
      '@tanstack/query': tanstackQueryPlugin,
    },
    rules: tanstackQueryPlugin.configs.recommended.rules,
  },
  // SVG JSX plugin configuration
  {
    plugins: {
      'svg-jsx': svgJsxPlugin,
    },
    rules: {
      'svg-jsx/camel-case-dash': 'error',
      'svg-jsx/camel-case-colon': 'error',
      'svg-jsx/no-style-string': 'error',
    },
  },
  // TypeScript-specific rules
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  // Prettier integration (should be last)
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
  },
];
