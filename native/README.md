# MyQuiz React Native App

A complete React Native quiz application with Squid Game-inspired design, featuring bottom navigation, category-based quizzes, leaderboards, and user profiles.

## 🚀 Features

### ✅ **Bottom Navigation**

- **Home**: Dashboard with stats, categories preview, and quick actions
- **Play**: All quiz categories with "See All" functionality
- **Leaderboard**: Global rankings with podium display
- **Profile**: User stats, achievements, and settings

### ✅ **Core Screens**

1. **Splash Screen** - Animated logo with auto-navigation
2. **Welcome Screen** - Get started and login options
3. **Signup/Login** - Complete authentication flow
4. **Home Dashboard** - Stats cards, featured categories, quick actions
5. **Quiz Categories** - Complete category list with search
6. **Quiz List** - Category-specific quizzes with difficulty badges
7. **Quiz Play** - Interactive quiz with timer and progress
8. **Quiz Results** - Score analysis and performance feedback
9. **Leaderboard** - Rankings with podium and user position
10. **Profile** - User info, achievements, and account management

### 🎨 **Design Features**

- **Squid Game Color Scheme**: Pink (#E91E63), Teal (#0F766E), Yellow (#FFFF00)
- **Mobile-First Design**: Optimized for mobile devices
- **Smooth Animations**: Engaging transitions and interactions
- **Dark/Light Mode Support**: Comprehensive theming system
- **Accessibility**: Screen reader friendly with proper labels

## 📱 **Installation & Setup**

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI: `npm install -g @expo/cli`
- Expo Go app on your phone (for testing)

### Quick Start

1. **Navigate to the native directory:**

   ```bash
   cd native
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npx expo start
   ```

4. **Run on device:**
   - **iOS**: Press `i` or scan QR code with Camera app
   - **Android**: Press `a` or scan QR code with Expo Go app
   - **Web**: Press `w` to open in browser

### Alternative Setup (From Root)

If you're in the main project directory:

```bash
# Install React Native dependencies
npm install expo @expo/cli react-native

# Copy native files to a new Expo project
npx create-expo-app MyQuizApp --template blank-typescript
cp -r native/* MyQuizApp/
cd MyQuizApp
npm install
npx expo start
```

## 🛠 **Tech Stack**

- **Framework**: React Native with Expo
- **Navigation**: React Navigation v6 (Stack + Bottom Tabs)
- **Icons**: Expo Vector Icons (Ionicons)
- **State Management**: Context API with useReducer
- **TypeScript**: Full type safety
- **Styling**: StyleSheet with responsive design

## 📂 **Project Structure**

```
native/
├── App.tsx                 # Main app entry point
├── types/                  # TypeScript interfaces
├── contexts/               # React Context for state management
├── navigation/             # Navigation configuration
├── screens/                # All app screens
│   ├── SplashScreen.tsx
│   ├── WelcomeScreen.tsx
│   ├── HomeScreen.tsx      # Dashboard with categories
│   ├── PlayScreen.tsx      # All categories view
│   ├── LeaderboardScreen.tsx
│   ├── ProfileScreen.tsx
│   └── ...
├── styles/                 # Colors and styling constants
└── components/             # Reusable components
```

## 🎯 **Key Features Implemented**

### Bottom Navigation

- **Home Tab**: Dashboard with quick stats and featured categories
- **Play Tab**: Complete quiz categories with "See All" functionality
- **Leaderboard Tab**: Global rankings with podium display
- **Profile Tab**: User management and achievements

### Home Dashboard Enhancements

- **Stats Cards**: Points, Quizzes Played, Withdrawable, Referrals
- **Featured Categories**: First 4 categories with "See All" button
- **Quick Actions**: Direct access to referrals and withdrawals
- **Play Now Section**: Prominent call-to-action

### Mobile-Optimized Design

- **Touch-friendly**: Large tap targets and gestures
- **Responsive**: Adapts to different screen sizes
- **Native Feel**: Platform-specific UI patterns
- **Performance**: Optimized animations and rendering

## 🔧 **Customization**

### Colors

Edit `native/styles/colors.ts` to modify the Squid Game theme:

```typescript
export const Colors = {
  light: {
    primary: "#E91E63", // Squid Game Pink
    secondary: "#0F766E", // Squid Game Teal
    accent: "#FFFF00", // Squid Game Yellow
    // ... other colors
  },
};
```

### Add New Screens

1. Create screen in `native/screens/`
2. Add route to `native/navigation/AppNavigator.tsx`
3. Update types in `native/types/index.ts`

## 📱 **Building for Production**

### Android APK

```bash
npx expo build:android
```

### iOS IPA

```bash
npx expo build:ios
```

### App Stores

```bash
npx expo submit:android
npx expo submit:ios
```

## 🐛 **Troubleshooting**

### Common Issues

1. **Metro bundler issues:**

   ```bash
   npx expo start --clear
   ```

2. **Dependencies not found:**

   ```bash
   rm -rf node_modules
   npm install
   ```

3. **iOS simulator not opening:**
   ```bash
   npx expo install --fix
   ```

## 📄 **License**

This project is licensed under the MIT License.

---

**🎮 Ready to play? Your React Native MyQuiz app is ready to go!**
