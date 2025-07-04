# MyQuiz React Native App

A complete React Native clone of the MyQuiz web application with identical design, colors, and functionality.

## 🎯 Features

- ✅ **Perfect Visual Match**: Exact same colors, gradients, and styling as web app
- ✅ **Dark/Light Mode**: Complete theme support matching web app
- ✅ **Splash Screen**: Animated logo with rotation and auto-navigation
- ✅ **Welcome Screen**: Perfect gradient text, buttons with icons
- ✅ **Bottom Navigation**: Home, Play, Leaderboard, Profile tabs
- ✅ **Gradient Backgrounds**: Identical to web app gradients
- ✅ **Component System**: Reusable Logo, GradientText, GradientBackground

## 🎨 Design System

### Colors (Exact Web App Match)

- **Primary**: `rgb(238, 58, 124)` (Pink)
- **Secondary**: `rgb(24, 154, 144)` (Teal)
- **Accent**: `rgb(255, 204, 0)` (Yellow)
- **Text**: `rgb(2, 8, 23)` (Dark text)
- **Background**: Linear gradients with pink/teal overlays

### Typography

- **Titles**: 48px, 700 weight
- **Body**: 16px, 400 weight
- **Buttons**: 18px, 600 weight

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI
- React Native development environment

### Installation

1. **Install dependencies**:

   ```bash
   cd MyQuizApp
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm start
   ```

3. **Run on device**:
   - Scan QR code with Expo Go app
   - Or use `npm run android` / `npm run ios`

## 📱 Screens Implemented

### ✅ Complete Screens

- **SplashScreen**: Animated logo with rotation
- **WelcomeScreen**: Perfect match to web app design

### 🚧 Placeholder Screens (Ready for Development)

- **HomeScreen**: Dashboard with stats and categories
- **PlayScreen**: Quiz categories grid
- **LeaderboardScreen**: Rankings and leaderboard
- **ProfileScreen**: User profile and settings

## 🏗️ Project Structure

```
MyQuizApp/
├── App.tsx                 # Main app entry
├── src/
│   ├── components/         # Reusable components
│   │   └── common/
│   │       ├── GradientBackground.tsx
│   │       ├── GradientText.tsx
│   │       └── Logo.tsx
│   ├── contexts/           # State management
│   │   ├── QuizContext.tsx
│   │   └── ThemeContext.tsx
│   ├── navigation/         # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── screens/            # App screens
│   │   ├── SplashScreen.tsx
│   │   ├── WelcomeScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── PlayScreen.tsx
│   │   ├── LeaderboardScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── styles/             # Design system
│   │   └── colors.ts
│   └── types/              # TypeScript types
│       └── index.ts
└── package.json
```

## 🎯 Next Steps

1. **HomeScreen Development**: Build dashboard with stats cards and featured categories
2. **PlayScreen Development**: Create categories grid matching web app
3. **LeaderboardScreen**: Implement rankings with podium design
4. **ProfileScreen**: User profile with achievements and settings

## 🤝 Development Notes

- All components use the exact same colors as the web app
- Dark/light mode is fully implemented with proper gradients
- Navigation matches web app flow and structure
- TypeScript for full type safety
- Consistent component naming and structure

Ready for screen-by-screen development to complete the full web app clone!
