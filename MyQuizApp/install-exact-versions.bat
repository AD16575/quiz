@echo off
echo 🔧 Installing exact Expo-recommended versions...

REM Remove everything
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

REM Clear npm cache
npm cache clean --force

REM Install exact versions
npm install

REM Let Expo fix any remaining issues
npx expo install --fix

REM Start with cache clear
echo ✅ Starting app with clean cache...
npx expo start --clear

echo 🎉 App should now work perfectly with your Expo Go version!
pause
