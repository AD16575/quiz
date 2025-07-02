# MyQuiz React Native - Quick Setup

## 🚀 **Quick Start (Fixed Versioning)**

### 1. **Check Your Expo Go App Version**

- Open Expo Go on your phone
- Check version (should be 51.x.x or compatible)
- If older, update from App Store/Play Store

### 2. **Setup Project**

```bash
# Navigate to native directory
cd native

# Clean install
rm -rf node_modules package-lock.json
npm install

# Start development server
npx expo start
```

### 3. **If You Still Get Errors**

**Option A: Use Latest Expo SDK**

```bash
# Install latest Expo CLI
npm install -g @expo/cli@latest

# Start with clear cache
npx expo start --clear
```

**Option B: Match Your Expo Go Version**
If your Expo Go app is version 53.x.x, update the package.json:

```json
{
  "dependencies": {
    "expo": "~53.0.0",
    "expo-status-bar": "~1.12.1"
  }
}
```

### 4. **Common Fixes**

**Plugin Error Fix:**

- Removed `expo-router` plugin (we use React Navigation)
- Updated to compatible Expo SDK version

**Version Mismatch Fix:**

- Updated all dependencies to latest compatible versions
- Expo SDK: ~51.0.28 (compatible with Expo Go 51.x.x)

**Metro Bundler Issues:**

```bash
npx expo start --clear
# or
npx expo start --reset-cache
```

## 📱 **Testing**

1. **On Phone:**

   - Scan QR code with Expo Go app
   - Should load without plugin errors

2. **On Simulator:**
   ```bash
   npx expo start --ios    # iOS Simulator
   npx expo start --android # Android Emulator
   ```

## 🛠 **Alternative: Create Fresh Expo Project**

If issues persist:

```bash
# Create new Expo project
npx create-expo-app MyQuizApp --template blank-typescript

# Copy our files
cp -r native/screens MyQuizApp/
cp -r native/contexts MyQuizApp/
cp -r native/navigation MyQuizApp/
cp -r native/styles MyQuizApp/
cp -r native/types MyQuizApp/
cp native/App.tsx MyQuizApp/

# Install navigation dependencies
cd MyQuizApp
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler

# Start
npx expo start
```

## ✅ **What's Fixed**

- ❌ Removed `expo-router` plugin
- ✅ Updated to Expo SDK 51.x.x
- ✅ Compatible with latest Expo Go app
- ✅ All dependencies version-matched
- ✅ No plugin resolution errors

Your MyQuiz app should now start without version conflicts!
