const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Disable package exports resolution so Metro falls back to "main" (CJS) field
// This fixes @tabler/icons-react-native which has a broken ESM build (missing icons/index.mjs)
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
