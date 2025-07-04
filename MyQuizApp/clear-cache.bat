@echo off
echo 🧹 Clearing React Native/Expo caches...

REM Remove node_modules and package-lock.json
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

REM Clear npm cache
npm cache clean --force

REM Install dependencies
npm install

REM Clear Metro cache and start
npx expo start --clear

echo ✅ Cache cleared and app started!
pause
