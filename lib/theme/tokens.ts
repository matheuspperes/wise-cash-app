export const themeTokens = {
  colors: {
    dark: {
      background: "#0b1020",
      surface: "#131a2b",
      surfaceAlt: "#1a2340",
      foreground: "#e8ecff",
      muted: "#9ca7c5",
      primary: "#7c8cff",
      secondary: "#5ba8ff",
      accent: "#9583ff",
      danger: "#ff6a7a",
      border: "#273356",
      ring: "#7c8cff",
    },
    light: {
      background: "#f7f9ff",
      surface: "#ffffff",
      surfaceAlt: "#eef2ff",
      foreground: "#17213e",
      muted: "#5a6588",
      primary: "#5b68e8",
      secondary: "#2f7dde",
      accent: "#6f57db",
      danger: "#d53c53",
      border: "#dbe2ff",
      ring: "#5b68e8",
    },
  },
  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
  },
  spacing: {
    18: "4.5rem",
    22: "5.5rem",
  },
  shadow: {
    card: "0 10px 30px rgba(8, 10, 24, 0.24)",
    elevated: "0 18px 40px rgba(8, 10, 24, 0.36)",
  },
  duration: {
    fast: "120ms",
    normal: "220ms",
    slow: "320ms",
  },
} as const;
