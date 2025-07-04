#!/bin/bash

echo "🔧 Complete React Native Fix - Solving all runtime errors..."

# Kill any running Metro processes
echo "🛑 Killing existing Metro processes..."
pkill -f "expo start" || true
pkill -f "metro" || true

# Remove all caches and modules
echo "🧹 Cleaning all caches..."
rm -rf node_modules
rm -f package-lock.json
rm -rf .expo
rm -rf ~/.expo/web-cache
rm -rf ~/.expo/yarn-v1

# Clear npm cache
npm cache clean --force

# Clear Expo CLI cache
npx expo logout || true
npx expo login || true

# Reinstall everything
echo "📦 Installing dependencies..."
npm install

# Fix Expo dependencies
echo "🔧 Fixing Expo dependencies..."
npx expo install --fix

# Clear Metro cache and start fresh
echo "🚀 Starting with clean slate..."
npx expo start --clear --dev-client

echo "✅ Complete fix applied! Try scanning QR code now."
