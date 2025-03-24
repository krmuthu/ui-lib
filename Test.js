Here's a script that can help you convert design tokens into Tailwind CSS `@apply` rules:

```javascript
// designTokenToTailwind.js
// This script converts design token objects to Tailwind CSS @apply rules

const fs = require('fs');
const path = require('path');

// Sample design token object (replace with your actual design token JSON or object)
const designTokens = {
  typography: {
    heading1: {
      fontFamily: 'display',
      fontSize: '4xl',
      fontWeight: 'bold',
      lineHeight: 'tight',
      letterSpacing: 'tight',
      color: 'gray-900'
    },
    heading2: {
      fontFamily: 'display',
      fontSize: '3xl',
      fontWeight: 'semibold',
      lineHeight: 'tight',
      letterSpacing: 'tight',
      color: 'gray-900'
    },
    bodyLarge: {
      fontFamily: 'body',
      fontSize: 'lg',
      fontWeight: 'normal',
      lineHeight: 'relaxed',
      color: 'gray-700'
    },
    body: {
      fontFamily: 'body',
      fontSize: 'base',
      fontWeight: 'normal',
      lineHeight: 'relaxed',
      color: 'gray-700'
    },
    caption: {
      fontFamily: 'body',
      fontSize: 'sm',
      fontWeight: 'normal',
      lineHeight: 'normal',
      color: 'gray-500'
    },
    button: {
      fontFamily: 'body',
      fontSize: 'sm',
      fontWeight: 'medium',
      lineHeight: 'none',
      letterSpacing: 'wide',
      textTransform: 'uppercase'
    }
  },
  spacing: {
    xs: '4',
    sm: '6',
    md: '8',
    lg: '12',
    xl: '16'
  },
  colors: {
    primary: {
      light: 'blue-400',
      default: 'blue-600',
      dark: 'blue-800'
    },
    secondary: {
      light: 'purple-400',
      default: 'purple-600',
      dark: 'purple-800'
    }
  }
};

// Function to convert token object properties to Tailwind classes
function tokenObjectToTailwindClasses(tokenObj) {
  let classes = [];
  
  for (const [key, value] of Object.entries(tokenObj)) {
    if (typeof value === 'string') {
      // Handle font properties
      if (key === 'fontFamily') {
        classes.push(`font-${value}`);
      } else if (key === 'fontSize') {
        classes.push(`text-${value}`);
      } else if (key === 'fontWeight') {
        classes.push(`font-${value}`);
      } else if (key === 'lineHeight') {
        classes.push(`leading-${value}`);
      } else if (key === 'letterSpacing') {
        classes.push(`tracking-${value}`);
      } else if (key === 'textTransform') {
        classes.push(value);
      } else if (key === 'color') {
        classes.push(`text-${value}`);
      } else {
        // Generic property
        classes.push(`${key}-${value}`);
      }
    }
  }
  
  return classes.join(' ');
}

// Generate CSS with @apply rules from design tokens
function generateCSSFromTokens(tokens) {
  let cssOutput = '/* Auto-generated Tailwind CSS @apply rules from design tokens */\n\n';
  cssOutput += '@layer components {\n';
  
  // Process typography tokens
  if (tokens.typography) {
    for (const [tokenName, tokenValue] of Object.entries(tokens.typography)) {
      // Convert camelCase to kebab-case for CSS class names
      const className = tokenName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      const tailwindClasses = tokenObjectToTailwindClasses(tokenValue);
      
      cssOutput += `  .${className} {\n`;
      cssOutput += `    @apply ${tailwindClasses};\n`;
      cssOutput += `  }\n\n`;
    }
  }
  
  // Process other token categories if needed
  // For example, button variants using color tokens
  if (tokens.colors) {
    for (const [colorName, colorVariants] of Object.entries(tokens.colors)) {
      cssOutput += `  .btn-${colorName} {\n`;
      cssOutput += `    @apply px-4 py-2 rounded font-medium bg-${colorVariants.default} text-white hover:bg-${colorVariants.dark};\n`;
      cssOutput += `  }\n\n`;
    }
  }
  
  cssOutput += '}\n';
  return cssOutput;
}

// Generate the CSS output
const outputCSS = generateCSSFromTokens(designTokens);

// Write to file
fs.writeFileSync(path.join(__dirname, 'design-token-classes.css'), outputCSS);
console.log('CSS file generated successfully!');
```

## How to Use This Script

1. Save this script as `designTokenToTailwind.js`
2. Replace the `designTokens` object with your actual design token object or import it from a JSON file
3. Run with Node.js: `node designTokenToTailwind.js`
4. The script will generate a CSS file named `design-token-classes.css` with all your @apply rules

## Sample Output

The generated CSS file will look something like this:

```css
/* Auto-generated Tailwind CSS @apply rules from design tokens */

@layer components {
  .heading1 {
    @apply font-display text-4xl font-bold leading-tight tracking-tight text-gray-900;
  }

  .heading2 {
    @apply font-display text-3xl font-semibold leading-tight tracking-tight text-gray-900;
  }

  .body-large {
    @apply font-body text-lg font-normal leading-relaxed text-gray-700;
  }

  .body {
    @apply font-body text-base font-normal leading-relaxed text-gray-700;
  }

  .caption {
    @apply font-body text-sm font-normal leading-normal text-gray-500;
  }

  .button {
    @apply font-body text-sm font-medium leading-none tracking-wide uppercase;
  }

  .btn-primary {
    @apply px-4 py-2 rounded font-medium bg-blue-600 text-white hover:bg-blue-800;
  }

  .btn-secondary {
    @apply px-4 py-2 rounded font-medium bg-purple-600 text-white hover:bg-purple-800;
  }
}
```

## Customizing the Script

You can customize the script in several ways:

1. Add support for more token types (borders, shadows, etc.)
2. Change the output format or class naming convention
3. Add media query support for responsive variants
4. Generate different output files for different token categories
5. Add support for theme variants (light/dark mode)

Would you like me to expand on any specific aspect of this script?​​​​​​​​​​​​​​​​
