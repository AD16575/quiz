#!/bin/bash

echo "🔧 Installing exact Expo-recommended versions..."

# Remove everything
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Install exact versions
npm install

# Let Expo fix any remaining issues
npx expo install --fix

# Start with cache clear
echo "✅ Starting app with clean cache..."
npx expo start --clear

echo "🎉 App should now work perfectly with your Expo Go version!"
