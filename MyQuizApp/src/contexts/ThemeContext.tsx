import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Colors } from "../styles/colors";

interface ThemeState {
  isDark: boolean;
  colors: typeof Colors.light;
}

type ThemeAction =
  | { type: "TOGGLE_THEME" }
  | { type: "SET_THEME"; payload: boolean };

const initialState: ThemeState = {
  isDark: false,
  colors: Colors.light,
};

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        isDark: !state.isDark,
        colors: !state.isDark ? Colors.dark : Colors.light,
      };
    case "SET_THEME":
      return {
        isDark: action.payload,
        colors: action.payload ? Colors.dark : Colors.light,
      };
    default:
      return state;
  }
}

const ThemeContext = createContext<{
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
