export default {
  '**/*.{cjs,js,json,mjs,ts}': (filenames) => [`prettier --write ${filenames.join(' ')}`],
};
