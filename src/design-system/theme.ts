import { color as colors } from "@echo-health/tokens";

// Adapted from https://theme-ui.com/theme-spec

export default {
  space: ["4px", "8px", "12px", "16px", "24px", "32px", "40px"],
  fonts: {
    body: "'IBM Plex Sans', sans-serif",
    mono: "'IBM Plex Mono', monospace",
    display: "'Cahuenga', Georgia, serif",
    icon: "'Material Icons'",
  },
  fontSizes: ["12px", "14px", "16px", "20px", "24px", "32px", "64px"],
  fontWeights: {
    normal: "400",
    bold: "500",
  },
  colors,
  misc: {
    borderRadius: "4px",
    cardShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    focusRingShadow: "0 0 0 4px",
  },
};
