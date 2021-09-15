import Typography from "typography";
import fairyGatesTheme from "typography-theme-stow-lake";

fairyGatesTheme.headerFontFamily = fairyGatesTheme.bodyFontFamily;
fairyGatesTheme.headerColor = "#2e2e2e";
fairyGatesTheme.bodyColor = "#4a4a4a";
fairyGatesTheme.baseFontSize = "16px";

const typography = new Typography(fairyGatesTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

// Export helper functions
export const { scale, rhythm, options } = typography;
export default typography;
