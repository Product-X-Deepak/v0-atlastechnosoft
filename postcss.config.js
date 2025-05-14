module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': false,
        'custom-properties': true,
      },
      browsers: ['defaults', 'not IE 11']
    },
    ...(process.env.NODE_ENV === 'production' 
      ? {
          'cssnano': {
            preset: ['default', {
              discardComments: {
                removeAll: true,
              },
              discardDuplicates: true,
              discardEmpty: true,
              reduceIdents: false,
              minifyFontValues: { removeQuotes: false },
              normalizeWhitespace: false
            }]
          }
        } 
      : {})
  }
} 