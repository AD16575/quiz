const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Ensure proper resolution for React Native modules
config.resolver.platforms = ["native", "ios", "android", "web"];

module.exports = config;
