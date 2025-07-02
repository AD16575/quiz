# 🔍 File Structure Check

## ❌ **Error Fix: "Unable to resolve screens"**

This error means the screens folder or files are missing. Here's how to check:

## 📁 **Required File Structure**

Your project should look like this:

```
MyQuizApp/  (or native/)
├── App.tsx
├── package.json
├── app.json
├── contexts/
│   └── QuizContext.tsx
├── navigation/
│   └── AppNavigator.tsx
├── screens/
│   ├── SplashScreen.tsx
│   ├── WelcomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── SignupScreen.tsx
│   ├── HomeScreen.tsx
│   ├── PlayScreen.tsx
│   ├── LeaderboardScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── QuizPlayScreen.tsx
│   ├── QuizResultScreen.tsx
│   └── QuizListScreen.tsx
├── styles/
│   └── colors.ts
└── types/
    └── index.ts
```

## 🔧 **Quick Fix Options:**

### **Option 1: Check if files exist**

In your project folder, check if these folders exist:

- `screens/` folder
- All `.tsx` files inside screens folder

### **Option 2: Create missing folders**

If folders are missing, create them:

```bash
# In your project root
mkdir screens contexts navigation styles types
```

### **Option 3: Copy files manually**

If you haven't copied the files yet, copy them from the original `native/` folder to your new project.

### **Option 4: Use relative imports (temporary fix)**

If the files exist but imports are still failing, try this temporary fix in `navigation/AppNavigator.tsx`:

```typescript
// Change from:
import SplashScreen from "../screens/SplashScreen";

// To:
import SplashScreen from "./SplashScreen"; // if screens are in same folder
// or
import SplashScreen from "../SplashScreen"; // if screens are one level up
```

## 🚀 **Quick Test:**

Run this in your project folder to check structure:

```bash
# Check if files exist
ls -la screens/
# or on Windows
dir screens\
```

If files are missing, that's the issue! Copy all the screen files from the original `native/screens/` folder.
