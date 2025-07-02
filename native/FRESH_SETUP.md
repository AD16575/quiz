# 🚀 Fresh MyQuiz React Native Setup

The Metro bundler error indicates dependency conflicts. Let's create a completely fresh setup:

## 🛠 **Method 1: Fresh Expo Project (Recommended)**

```bash
# 1. Navigate to your main project directory (not inside native folder)
cd C:\Users\USER\Downloads\aura-studio

# 2. Create fresh Expo project
npx create-expo-app@latest MyQuizApp --template blank-typescript

# 3. Navigate to new project
cd MyQuizApp

# 4. Install navigation dependencies
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler

# 5. Copy our MyQuiz files (you'll need to do this manually)
```

## 📁 **Files to Copy (Manual Step)**

Copy these files from `native/` to your new `MyQuizApp/` folder:

1. **Copy screens folder:**

   - Copy `native/screens/` → `MyQuizApp/screens/`

2. **Copy other folders:**

   - Copy `native/contexts/` → `MyQuizApp/contexts/`
   - Copy `native/navigation/` → `MyQuizApp/navigation/`
   - Copy `native/styles/` → `MyQuizApp/styles/`
   - Copy `native/types/` → `MyQuizApp/types/`

3. **Replace App.tsx:**
   - Copy `native/App.tsx` → `MyQuizApp/App.tsx`

## 🚀 **Method 2: Clean Current Setup**

If you want to fix the current setup:

```bash
# Navigate to native folder
cd C:\Users\USER\Downloads\aura-studio\native

# Complete clean installation
rm -rf node_modules
rm package-lock.json
rm yarn.lock (if exists)

# Install latest Expo CLI
npm uninstall -g expo-cli
npm uninstall -g @expo/cli
npm install -g @expo/cli@latest

# Fresh install with exact versions
npm install
```

## 📦 **Working Package.json (Copy This)**

Replace your `native/package.json` with this exact content:
