@echo off
echo 🔧 Complete React Native Fix - Solving all runtime errors...

REM Kill any running Metro processes
echo 🛑 Killing existing Metro processes...
taskkill /f /im node.exe /t 2>nul || echo No Node processes found

REM Remove all caches and modules
echo 🧹 Cleaning all caches...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist .expo rmdir /s /q .expo

REM Clear npm cache
npm cache clean --force

REM Reinstall everything
echo 📦 Installing dependencies...
npm install

REM Fix Expo dependencies
echo 🔧 Fixing Expo dependencies...
npx expo install --fix

REM Clear Metro cache and start fresh
echo 🚀 Starting with clean slate...
npx expo start --clear

echo ✅ Complete fix applied! Try scanning QR code now.
pause
