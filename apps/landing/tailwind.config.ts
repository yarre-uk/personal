import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import type { Config } from 'tailwindcss';
import * as tailwindCssAnimate from 'tailwindcss-animate';

import { join } from 'path';

export default {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {},
      borderRadius: {},
      screens: {
        xs: '375px',
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1240px',
        '2xl': '1436px',
        '3xl': '1636px',
        '4xl': '1786px',
        '5xl': '1925px',
      },
    },
  },
  plugins: [tailwindCssAnimate],
} as Config;
