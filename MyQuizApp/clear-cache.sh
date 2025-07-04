#!/bin/bash

echo "🧹 Clearing React Native/Expo caches..."

# Remove node_modules and package-lock.json
rm -rf node_modules
rm -f package-lock.json

# Clear npm cache
npm cache clean --force

# Clear Expo cache
npx expo install --fix

# Clear Metro cache
npx expo start --clear

echo "✅ Cache cleared! Now run: npm install && npx expo start"
